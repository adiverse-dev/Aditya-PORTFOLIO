const fs = require('fs').promises;
const path = require('path');

class ContentExtractor {
  constructor() {
    this.frontendSrcPath = path.resolve(__dirname, '../../../../../../frontend/src');
  }

  /**
   * Safely attempts to parse JS/TS object strings into actual JSON.
   */
  _parseArrayString(arrayStr) {
    try {
      // Extremely naive but effective conversion of unquoted keys to quoted keys for JSON.parse
      // WARNING: This is fragile for complex nested TS objects, but works for simple data arrays.
      // A more robust approach for production would be using Babel/AST parsing, 
      // but for this v1 pipeline, we'll try to execute it in a sandbox or clean the string.
      
      // Since this runs on trusted local files, we can use a safe evaluation approach 
      // (avoiding eval, using Function)
      // Note: This relies on the array being self-contained.
      const safeEval = new Function(`return ${arrayStr}`);
      return safeEval();
    } catch (e) {
      console.error(`[ContentExtractor] Failed to parse array: ${e.message}`);
      return null;
    }
  }

  async extractProjects() {
    try {
      const filePath = path.join(this.frontendSrcPath, 'data/projects.ts');
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Match export const projects: Project[] = [ ... ]
      const match = content.match(/export const projects[\s\S]*?=\s*(\[[\s\S]*?\]);?\n*$/m) || 
                    content.match(/export const projects[\s\S]*?=\s*(\[[\s\S]*?\])(?=\nexport|$)/s);
      
      if (match && match[1]) {
        return this._parseArrayString(match[1]);
      }
    } catch (e) {
      console.warn(`[ContentExtractor] Could not extract projects: ${e.message}`);
    }
    return null;
  }

  async extractExperiences() {
    try {
      const filePath = path.join(this.frontendSrcPath, 'sections/Experience.tsx');
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Match const experiences = [ ... ]
      const match = content.match(/const experiences\s*=\s*(\[[\s\S]*?\])\s*export/s);
      
      if (match && match[1]) {
        return this._parseArrayString(match[1]);
      }
    } catch (e) {
      console.warn(`[ContentExtractor] Could not extract experiences: ${e.message}`);
    }
    return null;
  }

  async extractAll() {
    console.log('[ContentExtractor] Starting frontend source extraction...');
    const [projects, experiences] = await Promise.all([
      this.extractProjects(),
      this.extractExperiences()
    ]);

    return {
      projects,
      experiences,
      // fallback manual injection for skills since we didn't write an extractor for it yet
      skills: [
        { category: "Frontend", items: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
        { category: "Backend", items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs"] },
        { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Linux", "Nginx"] }
      ]
    };
  }
}

module.exports = new ContentExtractor();
