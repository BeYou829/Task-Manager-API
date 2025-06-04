import { Check, Circle, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { toast, Toaster } from "sonner";

import type { Task } from "../types";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { useRef } from "react";

type Props = {
  task: Task;
};

export const TaskCard = ({ task }: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { mutate: deleteTask, isPending } = useDeleteTask();
  const { mutate: updateTask, isPending: isPendingUpdating } = useUpdateTask(
    () => {
      closeRef.current?.click(); // 👉 cierra el modal después de éxito
    }
  );

  const handleUpdate = (
    id: string,
    originalTask: Task,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const completed = formData.get("completed") !== null;

    if (typeof name === "string") {
      const trimmedName = name.trim();
      const changes: string[] = [];

      if (trimmedName !== originalTask.name) {
        changes.push(`Name changed to "${trimmedName}"`);
      }

      if (completed !== originalTask.completed) {
        changes.push(
          `Status changed to "${completed ? "completed" : "pending"}"`
        );
      }

      const updatedTask = {
        name: trimmedName,
        completed,
      };

      updateTask({ id, task: updatedTask });

      if (changes.length > 0) {
        toast("Task updated", {
          description: changes.join(" | "),
          className: "text-left",
        });
      } else {
        toast("No changes detected", {
          description: "You submitted the same values.",
          className: "text-left",
        });
      }
    }
  };

  return (
    <div className="flex w-full items-center gap-4 outline-gray-500 outline-1 rounded px-8 py-4">
      <Toaster />
      {task.completed ? (
        <Tooltip>
          <TooltipTrigger>
            <Check />
          </TooltipTrigger>
          <TooltipContent>
            <p>Task Completed</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger>
            <Circle />
          </TooltipTrigger>
          <TooltipContent>
            <p>Task Pending</p>
          </TooltipContent>
        </Tooltip>
      )}
      {/* <Pencil className="cursor-pointer" /> */}
      <h3 className="flex-2 text-left text-lg">{task?.name}</h3>
      <section className="flex-1 flex justify-end items-center gap-6">
        <button type="button" className="flex justify-center items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Pencil className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#121212] text-white">
              <form
                onSubmit={(e) => {
                  handleUpdate(task._id, task, e);
                }}
              >
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                  <DialogDescription>
                    Update the status of your task or rename it to be more
                    specific. Click save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6">
                  <div className="grid gap-3 mt-2">
                    <Label htmlFor="name-1">Name</Label>
                    <Input
                      className="bg-[#121212] text-white"
                      id="name-1"
                      name="name"
                      required
                      defaultValue={task.name}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="status"
                      name="completed"
                      defaultChecked={task.completed}
                      className="bg-white"
                    />
                    <Label htmlFor="status">Is it completed?</Label>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      ref={closeRef}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="cursor-pointer"
                    disabled={isPendingUpdating}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </button>
        <button type="button" className="flex justify-center items-center">
          <Dialog>
            <DialogTrigger>
              <Trash2 className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="bg-white text-black ">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  task, <i className="font-bold text-black">{task.name}</i>, and
                  you won't be able to get it back.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  onClick={() => {
                    deleteTask(task._id);
                  }}
                  disabled={isPending}
                >
                  {isPending ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </button>
      </section>
    </div>
  );
};
