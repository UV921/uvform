"use client";

import { useState, type FormEvent, useEffect } from "react";
import Link from "next/link";
import { Eye, FilePenLine, FileText, LoaderCircle, PencilLine, Plus } from "lucide-react";

import { useCreateForm, useEditForm, useListForms } from "~/hooks/api/form";
import { Brand } from "~/components/brand";
import { ThemeToggle } from "~/components/theme-toggle";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export default function DashboardForms() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editFormId, setEditFormId] = useState<string | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const { createFormAsync, error, status } = useCreateForm();
  const { forms, isLoading } = useListForms();
  const {editFormAsync}=useEditForm()
  const editingForm =
    forms && forms.length && editFormId ? forms.find((f) => f.id === editFormId) : null;

  useEffect(() => {
    if (editingForm) {
      setEditTitle(editingForm.title);
      setEditDescription(editingForm.description ?? "");
    }
  }, [editFormId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createFormAsync({
     
     
      title: title.trim(),
      description: description.trim() ? description.trim() : undefined,
    });

    setOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleEditSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await editFormAsync({
       id:editFormId!,
       title:editTitle.trim(),
      description: editDescription.trim() ? editDescription.trim() : null,

    })
    setEditFormId(null);
    setEditTitle("");
    setEditDescription("");
  };
  

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f8fbf9] text-stone-950 dark:bg-[#0a0a0b] dark:text-stone-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_5%_8%,rgba(16,185,129,0.13),transparent_30rem),radial-gradient(circle_at_95%_90%,rgba(74,222,128,0.08),transparent_28rem)] dark:bg-[radial-gradient(circle_at_5%_8%,rgba(255,255,255,0.05),transparent_28rem),radial-gradient(circle_at_95%_90%,rgba(148,163,184,0.035),transparent_28rem)]"
      />
      <header className="border-b border-stone-200 bg-white/90 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#0a0a0b]/85">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Brand />
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-stone-500 dark:text-stone-500 sm:block">
              Your workspace
            </span>
            <ThemeToggle />
            <div className="flex size-9 items-center justify-center rounded-full border border-stone-300 bg-white text-xs font-semibold text-stone-800 shadow-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-200 dark:shadow-none">
              CF
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 dark:text-stone-400">
              Workspace
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-stone-50 sm:text-4xl">
              Your forms
            </h1>
            <p className="mt-3 text-sm font-medium text-stone-700 dark:text-stone-400">
              {forms?.length
                ? `${forms.length} ${forms.length === 1 ? "form" : "forms"} in your workspace`
                : "Create and manage your forms in one place"}
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="h-10 rounded-full bg-emerald-700 px-5 text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-600 dark:bg-stone-100 dark:text-stone-950 dark:shadow-none dark:hover:bg-white">
                <Plus className="size-4" />
                New form
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl border-stone-200 bg-white p-6 text-stone-950 shadow-2xl shadow-stone-950/10 dark:border-white/10 dark:bg-[#151517] dark:text-stone-100 dark:shadow-black/40 sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl tracking-tight">Create a new form</DialogTitle>
                <DialogDescription className="leading-6 text-stone-600 dark:text-stone-400">
                  Give your form a clear name. You can add fields in the next step.
                </DialogDescription>
              </DialogHeader>

              <form className="mt-2 space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium text-stone-700 dark:text-stone-300"
                  >
                    Form name
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="e.g. Event registration"
                    className="h-11 rounded-xl border-stone-300 bg-white px-4 text-stone-950 shadow-sm placeholder:text-stone-400 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15 dark:border-white/12 dark:bg-white/[0.045] dark:text-stone-100 dark:shadow-none dark:placeholder:text-stone-600 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="flex items-center justify-between text-sm font-medium text-stone-700 dark:text-stone-300"
                  >
                    <span>Description</span>
                    <span className="text-xs font-normal text-stone-500 dark:text-stone-500">
                      Optional
                    </span>
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="What is this form for?"
                    className="min-h-24 resize-none rounded-xl border-stone-300 bg-white px-4 py-3 text-stone-950 shadow-sm placeholder:text-stone-400 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15 dark:border-white/12 dark:bg-white/[0.045] dark:text-stone-100 dark:shadow-none dark:placeholder:text-stone-600 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10"
                  />
                </div>

                {error ? (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-500/15 bg-red-500/[0.06] px-3 py-2.5 text-sm text-red-700 dark:text-red-300"
                  >
                    {error.message}
                  </p>
                ) : null}

                <DialogFooter className="pt-1">
                  <Button
                    type="submit"
                    disabled={status === "pending" || title.trim().length === 0}
                    className="h-10 rounded-xl bg-emerald-700 px-5 text-white hover:bg-emerald-600 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white"
                  >
                    {status === "pending" ? <LoaderCircle className="size-4 animate-spin" /> : null}
                    {status === "pending" ? "Creating…" : "Create form"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog
          open={editFormId !== null}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) {
              setEditFormId(null);
              setEditTitle("");
              setEditDescription("");
            }
          }}
        >
          <DialogContent className="rounded-2xl border-stone-200 bg-white p-6 text-stone-950 shadow-2xl shadow-stone-950/10 dark:border-white/10 dark:bg-[#151517] dark:text-stone-100 dark:shadow-black/40 sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl tracking-tight">
                <FilePenLine className="size-5 text-emerald-700 dark:text-stone-300" />
                Edit form
              </DialogTitle>
              <DialogDescription className="leading-6 text-stone-600 dark:text-stone-400">
                Update the title and description for this form.
              </DialogDescription>
            </DialogHeader>

            <form className="mt-2 space-y-5" onSubmit={handleEditSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="edit-title"
                  className="text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  Form name
                </label>
                <Input
                  id="edit-title"
                  value={editTitle}
                  onChange={(event) => setEditTitle(event.target.value)}
                  placeholder="e.g. Event registration"
                  className="h-11 rounded-xl border-stone-300 bg-white px-4 text-stone-950 shadow-sm placeholder:text-stone-400 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15 dark:border-white/12 dark:bg-white/[0.045] dark:text-stone-100 dark:shadow-none dark:placeholder:text-stone-600 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="edit-description"
                  className="flex items-center justify-between text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  <span>Description</span>
                  <span className="text-xs font-normal text-stone-500 dark:text-stone-500">
                    Optional
                  </span>
                </label>
                <Textarea
                  id="edit-description"
                  value={editDescription}
                  onChange={(event) => setEditDescription(event.target.value)}
                  placeholder="What is this form for?"
                  className="min-h-24 resize-none rounded-xl border-stone-300 bg-white px-4 py-3 text-stone-950 shadow-sm placeholder:text-stone-400 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15 dark:border-white/12 dark:bg-white/[0.045] dark:text-stone-100 dark:shadow-none dark:placeholder:text-stone-600 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10"
                />
              </div>

              <DialogFooter className="pt-1 gap-2 sm:gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditFormId(null);
                    setEditTitle("");
                    setEditDescription("");
                  }}
                  className="h-10 rounded-xl border-stone-300 bg-white px-5 text-stone-700 hover:bg-stone-50 dark:border-white/12 dark:bg-transparent dark:text-stone-300 dark:hover:bg-white/[0.06]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={editTitle.trim().length === 0}
                  className="h-10 rounded-xl bg-emerald-700 px-5 text-white hover:bg-emerald-600 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-52 animate-pulse rounded-2xl border border-stone-300 bg-white shadow-sm dark:border-white/[0.07] dark:bg-white/[0.025] dark:shadow-none"
              />
            ))
          ) : forms && forms.length > 0 ? (
            forms.map((form) => (
              <article
                key={form.id}
                className="group flex min-h-52 flex-col rounded-2xl border border-stone-300 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-700/35 hover:shadow-xl hover:shadow-stone-900/10 dark:border-white/[0.09] dark:bg-[#151517] dark:shadow-none dark:hover:border-white/20 dark:hover:bg-[#19191b]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-emerald-700/15 bg-emerald-600/10 text-emerald-800 transition-colors group-hover:bg-emerald-600/15 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-300 dark:group-hover:text-white">
                    <FileText className="size-[18px]" />
                  </div>
                  <span className="text-xs text-stone-500 dark:text-stone-500">
                    {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : ""}
                  </span>
                </div>

                <div className="mt-5 flex-1">
                  <h2 className="text-base font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                    {form.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-700 dark:text-stone-400">
                    {form.description || "No description added yet."}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-emerald-950/8 pt-4 dark:border-white/[0.06]">
                  <span className="text-xs text-stone-500 dark:text-stone-500">Form</span>
                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-lg text-stone-600 hover:bg-emerald-950/5 hover:text-emerald-800 dark:text-stone-400 dark:hover:bg-white/[0.08] dark:hover:text-white"
                    >
                      <Link href={`/form/${form.id}/submissions`} aria-label="View submissions">
                        <Eye className="size-4" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-lg text-stone-600 hover:bg-emerald-950/5 hover:text-emerald-800 dark:text-stone-400 dark:hover:bg-white/[0.08] dark:hover:text-white"
                    >
                      <Link href={`/dashboard/forms/${form.id}`} aria-label="Edit form fields">
                        <PencilLine className="size-4" />
                      </Link>
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Edit form details"
                      onClick={() => setEditFormId(form.id)}
                      className="size-8 rounded-lg text-stone-600 hover:bg-emerald-950/5 hover:text-emerald-800 dark:text-stone-400 dark:hover:bg-white/[0.08] dark:hover:text-white"
                    >
                      <FilePenLine className="size-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-20 text-center dark:border-white/10 dark:bg-white/[0.02]">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-700/15 bg-emerald-600/10 text-emerald-800 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-300">
                <FileText className="size-5" />
              </div>
              <h2 className="mt-5 text-base font-semibold text-stone-900 dark:text-stone-200">
                Your first form starts here
              </h2>
              <p className="mt-2 max-w-xs text-sm leading-6 text-stone-700 dark:text-stone-400">
                Create a form, add your questions, and start collecting responses.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
