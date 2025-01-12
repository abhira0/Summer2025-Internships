import os
import re
import typer
from typing import List, Optional
from enum import Enum
from rich.console import Console
from rich.tree import Tree

console = Console()

app = typer.Typer(help="Consolidate files from a directory into a single document.")

class OutputFormat(str, Enum):
    text = "text"
    markdown = "markdown"
    html = "html"


def strip_rich_tags(text: str) -> str:
    """
    Strip Rich formatting tags and ANSI escape codes from the given text.
    """
    text = re.sub(r'\[\/?[\w\s=#]+\]', '', text)  # Remove Rich tags
    text = re.sub(r'\x1B[@-_][0-?]*[ -/]*[@-~]', '', text)  # Remove ANSI escape codes
    return text


def get_line_count(file_path: str) -> int:
    """
    Get the number of lines in a file.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        return sum(1 for _ in f)


def generate_tree(directory: str, ignore_patterns: List[str]) -> Tree:
    """
    Generate a tree-like structure for the given directory, ignoring files and directories
    matching the ignore patterns.
    """
    ignore_patterns.append('node_modules')  # Add node_modules to ignore patterns
    tree = Tree(f"[bold cyan]{directory}[/bold cyan]")
    for root, dirs, files in os.walk(directory):
        # Apply ignore patterns
        dirs[:] = [d for d in dirs if not any(re.search(pattern, d) for pattern in ignore_patterns)]
        files = [f for f in files if not any(re.search(pattern, f) for pattern in ignore_patterns)]

        branch = tree
        rel_path = os.path.relpath(root, directory)
        for part in rel_path.split(os.sep):
            branch = branch.children[0] if branch.children else branch
        if root != directory:
            branch = branch.add(f"[bold cyan]{os.path.basename(root)}/[/bold cyan]")
        for file in files:
            file_path = os.path.join(root, file)
            if file.endswith(('.py', '.js', '.java', '.cpp', '.c', '.cs', '.ts', '.go', '.rb', '.php', '.html', '.css', 'jsx', '.env', '.json')):
                line_count = get_line_count(file_path)
                branch.add(f"{file} ({line_count} lines)")
            else:
                branch.add(file)
    return tree


def consolidate_files(
    directory: str,
    ignore_patterns: List[str],
    include_tree: bool,
    output_format: OutputFormat,
    output_filename: str,
):
    """
    Consolidate files from the given directory into a single document.
    """
    ignore_patterns.append('node_modules')  # Add node_modules to ignore patterns
    content = []
    if include_tree:
        console.print(f"[green]Including directory structure...[/green]")
        tree = generate_tree(directory, ignore_patterns)
        with console.capture() as capture:
            console.print(tree)
        tree_str = strip_rich_tags(capture.get())
        content.append("### Directory Structure\n")
        content.append(f"```\n{tree_str}\n```\n")

    for root, dirs, files in os.walk(directory):
        # Apply ignore patterns
        dirs[:] = [d for d in dirs if not any(re.search(pattern, d) for pattern in ignore_patterns)]
        files = [f for f in files if not any(re.search(pattern, f) for pattern in ignore_patterns)]

        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content.append(f"### {file_path}\n")
                    content.append(f"```\n{f.read()}\n```\n")
            except Exception as e:
                content.append(f"### {file_path} (Error reading file: {e})\n")

    consolidated_content = "\n".join(content)

    # Save to output file
    extension = "md" if output_format == OutputFormat.markdown else output_format.value
    output_file = f"{output_filename}.{extension}"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(consolidated_content)

    console.print(f"[green]Consolidated content saved to {output_file}[/green]")


@app.command()
def main(
    directory: str = typer.Argument(..., help="Directory to search for files."),
    ignore: Optional[List[str]] = typer.Option(None, "-i", "--ignore", help="Regex patterns to ignore files or directories."),
    include_tree: bool = typer.Option(True, "-t", "--include-tree", help="Include tree-like directory structure in output."),
    output_format: OutputFormat = typer.Option(OutputFormat.markdown, "-o", "--output-format", help="Format of the output file."),
    output_filename: str = typer.Option("consolidated_output", "-n", "--output-filename", help="Name of the output file (without extension)."),
    summarize: bool = typer.Option(False, "-s", "--summarize", help="Summarize directory structure instead of including full details."),
):
    """
    Consolidate files from a directory into a single document.
    """
    ignore = ignore or []
    ignore.extend(['node_modules', '__pycache__'])  # Add node_modules to ignore patterns
    if summarize:
        console.print(f"[yellow]Summary mode selected. Only showing directory structure.[/yellow]")
        tree = generate_tree(directory, ignore)
        console.print(tree)
    else:
        consolidate_files(directory, ignore, include_tree, output_format, output_filename)


if __name__ == "__main__":
    app()
