import * as ts from 'typescript';
import * as Lint from 'tslint';
import * as fs from 'fs';

// Note: Class file suffix must be 'Rule' and filename in camelCase
export class Rule extends Lint.Rules.AbstractRule {
  static FAILURE_STRING = 'File should contain copyright header';

  public apply (sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
  }
}

// Note: This worker visits each source file
class Walker extends Lint.RuleWalker {
  protected visitSourceFile (sourceFile: ts.SourceFile) {
    if (sourceFile && sourceFile.fileName && sourceFile.getFullText()) {
      let copyrightHeaderTemplate =
        fs.readFileSync('./ts-rules/copyrightHeader.txt').toString();

      // Create copyright header based on the file name
      copyrightHeaderTemplate = copyrightHeaderTemplate
                                  .replace('{fileName}',
                                    sourceFile.fileName.substring(
                                      sourceFile.fileName.lastIndexOf('/') + 1
                                    )
                                  );

      // Check if file has copyright header, otherwise early exit
      if (sourceFile.getFullText().startsWith(copyrightHeaderTemplate)) {
        return super.visitSourceFile(sourceFile);
      }

      // Create a failure at the current position
      this.addFailureAt(
        0, // i.e. sourceFile.getStart()
        1, // i.e. sourceFile.getEnd() - sourceFile.getStart()
        Rule.FAILURE_STRING,
        this.fix(sourceFile, copyrightHeaderTemplate)
      );

      return super.visitSourceFile(sourceFile);
    }

    // Call base version of this visitor to parse this code
    super.visitSourceFile(sourceFile);
  }

  // Create a fixer for the failure
  private fix (sourceFile: ts.SourceFile, copyrightHeaderTemplate: string): Lint.Fix {
    return new Lint.Replacement(
      0,
      0,
      copyrightHeaderTemplate + '\n\n'
    );
  }
}
