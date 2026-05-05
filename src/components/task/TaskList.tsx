'use client'

import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ListChecks, User, Calendar as CalendarIcon } from "lucide-react"
import { tarefas } from "@/types/tarefas"
import { Task } from "@/types/task"

export default function TaskList({ tasks }: { tasks: Task[] }) {
    const [open, setOpen] = useState(false)
    const [filter, setFilter] = useState<string>("")

    const formatDate = (dateString?: string) => {
        if (!dateString) return ""

        const date = new Date(dateString)
        const d = date.toLocaleDateString('pt-BR')
        const h = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

        return `${d} às ${h}`
    }

    const groupedEntries = useMemo(() => {
        const base = filter
            ? tasks.filter(t => t.title === filter)
            : []

        const sorted = [...base].sort((a, b) => {
            return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
        })

        const grouped = sorted.reduce((acc: Record<string, Task[]>, task) => {
            const key = task.title

            if (!acc[key]) acc[key] = []

            acc[key].push(task)

            return acc
        }, {})

        return Object.entries(grouped).sort((a, b) => {
            return new Date(b[1][0]?.created_at ?? 0).getTime() - new Date(a[1][0]?.created_at ?? 0).getTime()
        })
    }, [tasks, filter])

    const handleOpenChange = (value: boolean) => {
        setOpen(value)
        if (!value) setFilter("")
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(true)}
                    className="gap-2 rounded-full border-slate-200 text-slate-600 bg-slate-200 hover:text-black transition-all active:scale-95 px-6 py-5">
                    <ListChecks className="h-4 w-4" /> Visualizar Lista
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md border-none bg-white p-0 overflow-hidden shadow-2xl rounded-lg">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-xl font-semibold text-slate-900">Tarefas Registradas</DialogTitle>
                    <DialogDescription className="text-slate-500">Selecione um filtro para visualizar as tarefas.</DialogDescription>
                </DialogHeader>

                <div className="px-6 pb-8 pt-4">
                    <div className="mb-6 flex items-center gap-2">
                        <div className="relative flex-1">
                            <Select value={filter} onValueChange={setFilter}>
                                <SelectTrigger className="w-full bg-white border-slate-200 text-black focus:ring-2 focus:ring-emerald-500/20">
                                    <SelectValue placeholder="Selecione uma tarefa" />
                                </SelectTrigger>

                                <SelectContent position="popper" side="bottom" sideOffset={4} className="w-(--radix-select-trigger-width) bg-white border-slate-200">
                                    {tarefas.map((item) => (
                                        <SelectItem key={item.value} value={item.value} className="text-black focus:bg-slate-100 cursor-pointer">
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                        {filter ? (
                            groupedEntries.length > 0 ? (
                                groupedEntries.map(([title, tasks]) => (
                                    <div key={title} className="space-y-2">
                                        {tasks.map((task) => (
                                            <li key={task.id}
                                                className="list-none group p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors"
                                            >
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                                        <div className="flex items-center gap-1">
                                                            <User className="h-3 w-3 text-emerald-600" />
                                                            <span className="capitalize">{task.user || "Anônimo"}</span>
                                                        </div>
                                                        {task.created_at && (
                                                            <div className="flex items-center gap-1">
                                                                <CalendarIcon className="h-3 w-3 text-slate-400" />
                                                                {formatDate(task.created_at)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div className="py-10 text-center">
                                    <p className="text-slate-400 text-sm">Nenhuma tarefa encontrada.</p>
                                </div>
                            )
                        ) : (
                            <div className="py-10 text-center">
                                <p className="text-slate-400 text-sm">Selecione um filtro para visualizar tarefas.</p>
                            </div>
                        )}

                    </div>

                    <div className="pt-6">
                        <Button onClick={() => setOpen(false)}  className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg">
                            Fechar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}