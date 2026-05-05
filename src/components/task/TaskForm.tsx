'use client'

import { createTask } from "@/actions/actions"
import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Plus, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { tarefas } from "@/types/tarefas"

export default function TaskForm() {
    const [open, setOpen] = useState(false);

    const currentDateTime = open 
        ? new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) 
        : "";

    async function handleSubmit(formData: FormData) {
        await createTask(formData)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all active:scale-95 px-6 py-5">
                    <Plus className="h-4 w-4" /> Nova Tarefa
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-100 border-none bg-white p-0 overflow-hidden shadow-2xl rounded-lg">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-xl font-semibold text-slate-900">Nova Tarefa</DialogTitle>
                    <DialogDescription className="text-slate-500">
                        Preencha os detalhes da nova atividade.
                    </DialogDescription>
                </DialogHeader>
                
                <form action={handleSubmit} className="px-6 pb-6 space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="createdAt" className="text-sm font-medium text-slate-700">Data de Criação</Label>
                        <div className="relative">
                            <Input id="createdAt" value={currentDateTime} readOnly
                                   className="bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed pl-10" />
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                            O que precisa ser feito?
                        </Label>
                        <Select name="title" required>
                            <SelectTrigger className="w-full bg-white border-slate-200 text-black focus:ring-2 focus:ring-emerald-500/20">
                                <SelectValue placeholder="Selecione a tarefa" />
                            </SelectTrigger>
                            <SelectContent position="popper" side="bottom" sideOffset={4} className="w-(--radix-select-trigger-width) bg-white border-slate-200 shadow-xl">
                                {tarefas.map((item) => (
                                    <SelectItem key={item.value} value={item.value} className="text-black focus:bg-slate-100 cursor-pointer">
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="user" className="text-sm font-medium text-slate-700">
                            Quem vai realizar?
                        </Label>
                        <Select name="user" required>
                            <SelectTrigger className="w-full bg-white border-slate-200 text-black focus:ring-2 focus:ring-emerald-500/20">
                                <SelectValue placeholder="Selecione o responsável" />
                            </SelectTrigger>
                            <SelectContent position="popper" side="bottom" sideOffset={4} className="w-(--radix-select-trigger-width) bg-white border-slate-200 shadow-xl">
                                <SelectItem value="isadora" className="text-black focus:bg-slate-100 cursor-pointer">Isadora</SelectItem>
                                <SelectItem value="vitoria" className="text-black focus:bg-slate-100 cursor-pointer">Vitória</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="pt-2">
                        <Button  type="submit" className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all">
                            Salvar Tarefa
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}