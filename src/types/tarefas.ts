export const tarefas = [
    { value: "lavar_louca", label: "Lavar a louça" },
    { value: "passar_aspirador", label: "Passar o aspirador" },
    { value: "passar_pano", label: "Passar o pano" },
    { value: "lavar_roupa", label: "Lavar/Extender a roupa" },
    { value: "pegar_ifood", label: "Pegar o iFood" },
] as const;

export type Tarefa = typeof tarefas[number]["value"];