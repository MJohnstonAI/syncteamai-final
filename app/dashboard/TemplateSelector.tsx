import { demoTemplates, type DemoTemplate } from "app/dashboard/templates";

// This component receives a function to call when a template is selected
interface TemplateSelectorProps {
  onSelectTemplate: (template: DemoTemplate) => void;
}

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to SyncTeamAI</h1>
      <p className="text-lg text-gray-400 mb-8">
        As a free user, you can explore the power of AI collaboration with our pre-built demo templates. Select one to begin.
      </p>
      <div className="w-full max-w-4xl rounded-lg border border-gray-700 bg-black/40 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-sm font-semibold text-gray-300">
            <tr>
              <th className="p-4">Template Title</th>
              <th className="p-4">Description</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {demoTemplates.map((template) => (
              <tr key={template.id} className="border-t border-gray-700 hover:bg-gray-800/50">
                <td className="p-4 font-semibold">{template.title}</td>
                <td className="p-4 text-gray-400">{template.description}</td>
                <td className="p-4">
                  <button 
                    onClick={() => onSelectTemplate(template)}
                    className="rounded-md bg-electric-blue px-4 py-2 font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
                  >
                    Load Demo
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}