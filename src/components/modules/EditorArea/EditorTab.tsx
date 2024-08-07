import { Panel, PanelGroup } from "react-resizable-panels";
import { useEditor } from "../../../store/Editor";
import Editor from "../Editor/Editor";
import { useState } from "react";
import { useDatabase } from "../../../store/DB/Database";
import ResultViewer from "../ResultViewer/ResultViewer";

export default function EditorTab({ id }: { id: string }) {
  const { tabs, updateTab } = useEditor(({ tabs, updateTab }) => ({
    tabs,
    updateTab,
  }));

  const [isQuerying, setIsQuerying] = useState(false);
  const { runQuery } = useDatabase();

  // const generateTabName = async (query: string) => {
  //   console.log(`Generating name for query: ${query}`);
  //   // check if the editor has name in the format of "Query #"
  //   if (tabs[id].name.match(/^Query \d+$/)) {
  //     const name = await generateQueryName(query);
  //     if (name) {
  //       updateTab({
  //         ...tabs[id],
  //         name,
  //       });
  //     }
  //   }
  // };

  const run = async (query: string) => {
    setIsQuerying(true);
    const result = await runQuery({ query, saveQuery: true });
    updateTab({
      ...tabs[id],
      result,
    });
    setIsQuerying(false);
    // generateTabName(query);
  };

  return (
    <PanelGroup direction="vertical">
      <Panel id="editor" minSize={25} order={1}>
        <Editor
          tabId={id}
          value={tabs[id].query}
          onChange={(value) => {
            updateTab({
              ...tabs[id],
              query: value,
            });
          }}
          onClickRun={run}
          totalRows={tabs[id].result?.rows?.length}
          affectedRows={tabs[id].result?.affectedRows}
          isQuerying={isQuerying}
        />
      </Panel>
      <Panel id="result" minSize={25} order={2}>
        <ResultViewer
          result={tabs[id].result}
          error={tabs[id].result?.error}
          isQuerying={isQuerying}
        />
      </Panel>
    </PanelGroup>
  );
}
