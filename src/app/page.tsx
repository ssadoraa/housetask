import TaskForm from "@/components/task/TaskForm"
import TaskListModal from "@/components/task/TaskList"
import { createClient } from "@/lib/supabase/server"

export default async function Home() {
    const supabase = await createClient()
    const { data: tasks } = await supabase.from('tasks').select('*')

    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-center p-8 bg-slate-50">
            <h1 className="text-4xl font-bold mb-6 text-slate-900">
                Check-in de Tarefas Domésticas
            </h1>
            <p className="text-[16px] text-gray-600 mb-12 max-w-2xl">
                Registre novas atividades ou visualize o que já foi feito.
            </p>

            <div className="flex gap-6 items-center">
                <TaskForm />
                <TaskListModal tasks={tasks || []} />
            </div>
        </div>
    )
}