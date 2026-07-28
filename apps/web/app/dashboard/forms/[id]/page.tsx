"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, GripVertical, LoaderCircle, PencilLine, Plus } from "lucide-react";

import { useCreateField, useGetFields, useUpdateFeild } from "~/hooks/api/form-feild";
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
import { Checkbox } from "~/components/ui/checkbox";

export default function FormBuilder() {
  const params = useParams();
  const formId = params?.id as string | undefined;

  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [type, setType] = useState<"TEXT" | "NUMBER" | "EMAIL" | "YES_NO" | "PASSWORD">("TEXT");
  const [description, setDescription] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [editFieldId, setEditFieldId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editType, setEditType] = useState<"TEXT" | "NUMBER" | "EMAIL" | "YES_NO" | "PASSWORD">(
    "TEXT",
  );
  const [editDescription, setEditDescription] = useState("");
  const [editPlaceholder, setEditPlaceholder] = useState("");
  const [editIsRequired, setEditIsRequired] = useState(false);

  const { createFieldAsync, status, error } = useCreateField(formId ?? "");
  const { fields, isLoading: fieldsLoading } = useGetFields(formId ?? "");
  const { updateFeildAsync } = useUpdateFeild(formId ?? "");
  const editingFeild =
    fields && fields.length && editFieldId ? fields.find((f) => f.id === editFieldId) : null;
  //button click hua for edit
  //id aagyi
  //then edit feild aagya
  //
  useEffect(() => {
    if (editingFeild) {
      setEditLabel(editingFeild.label);
      setEditDescription(editingFeild.description ?? "");
      setEditType(editingFeild.type);
      setEditPlaceholder(editingFeild.placeholder ?? "");
      setEditIsRequired(editingFeild.isRequired);
    }
  }, [editFieldId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formId) return;

    await createFieldAsync({
      label: label.trim(),
      type,
      formId,
      description: description.trim() ? description.trim() : undefined,
      placeholder: placeholder.trim() ? placeholder.trim() : undefined,
      isRequired,
    });
  };

  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formId || !editFieldId) return;
    await updateFeildAsync({
      id: editFieldId,
      label: editLabel.trim() ? editLabel.trim() : undefined,
      type: editType,
      description: editDescription.trim() ? editDescription.trim() : undefined,
      placeholder: editPlaceholder.trim() ? editPlaceholder.trim() : undefined,
      isRequired: editIsRequired,
    });
    setEditFieldId(null);
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f8fbf9] text-stone-950 dark:bg-[#0a0a0b] dark:text-stone-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_5%,rgba(16,185,129,0.14),transparent_32rem),radial-gradient(circle_at_90%_85%,rgba(74,222,128,0.10),transparent_30rem)] dark:bg-[radial-gradient(circle_at_10%_5%,rgba(255,255,255,0.05),transparent_28rem),radial-gradient(circle_at_85%_85%,rgba(148,163,184,0.035),transparent_28rem)]"
      />
      <header className="border-b border-stone-200 bg-white/90 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#0a0a0b]/85">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Brand />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-3 text-stone-600 hover:bg-emerald-950/5 hover:text-stone-950 dark:text-stone-400 dark:hover:bg-white/5 dark:hover:text-stone-100"
            >
              <Link href="/dashboard/forms">
                <ArrowLeft className="size-4" />
                All forms
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="mb-9 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 dark:text-stone-400">
              Form editor
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-stone-50 sm:text-4xl">
              Build your form
            </h1>
            <p className="mt-3 text-sm font-medium text-stone-700 dark:text-stone-400">
              Add and refine the questions your audience will answer.
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="h-10 rounded-full border-0 bg-emerald-700 px-5 text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-600 dark:bg-stone-100 dark:text-stone-950 dark:shadow-none dark:hover:bg-white">
                <Plus className="size-4" />
                Add field
              </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-stone-200 bg-white p-6 text-stone-950 shadow-2xl shadow-stone-950/10 dark:border-white/10 dark:bg-[#151517] dark:text-stone-100 dark:shadow-black/40 sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl tracking-tight">Add a question</DialogTitle>
                <DialogDescription className="leading-6 text-stone-600 dark:text-stone-400">
                  Choose how this question should appear on your form.
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                    Question
                  </label>
                  <Input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="What would you like to ask?"
                    className="h-11 rounded-xl border-stone-300 bg-white px-4 text-stone-950 shadow-sm placeholder:text-stone-400 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15 dark:border-white/12 dark:bg-white/[0.045] dark:text-stone-100 dark:shadow-none dark:placeholder:text-stone-600 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                    Answer type
                  </label>
                  <select
                    value={type}
                    onChange={(e) =>
                      setType(e.target.value as "TEXT" | "NUMBER" | "EMAIL" | "YES_NO" | "PASSWORD")
                    }
                    className="h-11 w-full rounded-xl border border-stone-300 bg-white px-4 text-sm text-stone-950 outline-none focus:border-emerald-600 dark:border-white/12 dark:bg-white/[0.045] dark:text-stone-100 dark:focus:border-white/30 dark:[&>option]:bg-[#151517] dark:[&>option]:text-stone-100 [&>option]:bg-white [&>option]:text-stone-950"
                  >
                    <option value="TEXT">Text</option>
                    <option value="NUMBER">Number</option>
                    <option value="EMAIL">Email</option>
                    <option value="YES_NO">Yes / No</option>
                    <option value="PASSWORD">Password</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                    Helper text
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional helper text"
                    className="resize-none rounded-xl border-stone-300 bg-white px-4 py-3 text-stone-950 shadow-sm placeholder:text-stone-400 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15 dark:border-white/12 dark:bg-white/[0.045] dark:text-stone-100 dark:shadow-none dark:placeholder:text-stone-600 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                    Placeholder
                  </label>
                  <Input
                    value={placeholder}
                    onChange={(e) => setPlaceholder(e.target.value)}
                    placeholder="Optional placeholder"
                    className="h-11 rounded-xl border-stone-300 bg-white px-4 text-stone-950 shadow-sm placeholder:text-stone-400 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15 dark:border-white/12 dark:bg-white/[0.045] dark:text-stone-100 dark:shadow-none dark:placeholder:text-stone-600 dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10"
                  />
                </div>

                <label className="flex items-center gap-2.5 text-sm text-stone-700 dark:text-stone-300">
                  <Checkbox
                    checked={isRequired}
                    onCheckedChange={(v) => setIsRequired(Boolean(v))}
                  />
                  Required field
                </label>

                {error ? <p className="text-sm text-red-400">{error.message}</p> : null}

                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={status === "pending" || !label.trim()}
                    className="h-10 rounded-xl bg-emerald-700 px-5 text-white hover:bg-emerald-600 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white"
                  >
                    {status === "pending" ? <LoaderCircle className="size-4 animate-spin" /> : null}
                    {status === "pending" ? "Adding…" : "Add question"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        <section className="overflow-hidden rounded-2xl border border-stone-300 bg-white shadow-lg shadow-stone-900/5 dark:border-white/10 dark:bg-[#151517] dark:shadow-none">
          <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50/80 px-5 py-5 dark:border-white/[0.07] dark:bg-white/[0.025] sm:px-6">
            <div>
              <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Questions
              </h2>
              <p className="mt-1 text-xs font-medium text-stone-700 dark:text-stone-400">
                Manage what appears on this form.
              </p>
            </div>
            <span className="rounded-full border border-stone-300 bg-white px-2.5 py-1 text-xs font-semibold text-stone-800 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-300">
              {fields?.length ?? 0}
            </span>
          </div>

          {fieldsLoading ? (
            <div className="flex items-center justify-center gap-2 px-5 py-14 text-sm font-medium text-stone-700 dark:text-stone-400">
              <LoaderCircle className="size-4 animate-spin" />
              Loading questions…
            </div>
          ) : fields && fields.length > 0 ? (
            fields.map((f) =>
              f.id === editFieldId ? (
                <form
                  key={f.id}
                  className="space-y-5 border-b border-stone-200 bg-stone-50 p-5 last:border-b-0 dark:border-white/[0.07] dark:bg-white/[0.025] sm:p-6"
                  onSubmit={handleEditSubmit}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                        Question
                      </label>
                      <Input
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        placeholder="Field label"
                        className="h-10 rounded-xl border-stone-300 bg-white px-4 text-stone-950 shadow-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15 dark:border-white/12 dark:bg-black/20 dark:text-stone-100 dark:shadow-none dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                        Answer type
                      </label>
                      <select
                        value={editType}
                        onChange={(e) =>
                          setEditType(
                            e.target.value as "TEXT" | "NUMBER" | "EMAIL" | "YES_NO" | "PASSWORD",
                          )
                        }
                        className="h-10 w-full rounded-xl border border-stone-300 bg-white px-4 text-sm text-stone-950 outline-none focus:border-emerald-600 dark:border-white/12 dark:bg-black/20 dark:text-stone-100 dark:focus:border-white/30 dark:[&>option]:bg-[#151517] dark:[&>option]:text-stone-100 [&>option]:bg-white [&>option]:text-stone-950"
                      >
                        <option value="TEXT">Text</option>
                        <option value="NUMBER">Number</option>
                        <option value="EMAIL">Email</option>
                        <option value="YES_NO">Yes / No</option>
                        <option value="PASSWORD">Password</option>
                      </select>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                        Helper text
                      </label>
                      <Textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Optional helper text"
                        className="resize-none rounded-xl border-stone-300 bg-white px-4 py-3 text-stone-950 shadow-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15 dark:border-white/12 dark:bg-black/20 dark:text-stone-100 dark:shadow-none dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                        Placeholder
                      </label>
                      <Input
                        value={editPlaceholder}
                        onChange={(e) => setEditPlaceholder(e.target.value)}
                        placeholder="Optional placeholder"
                        className="h-10 rounded-xl border-stone-300 bg-white px-4 text-stone-950 shadow-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/15 dark:border-white/12 dark:bg-black/20 dark:text-stone-100 dark:shadow-none dark:focus-visible:border-white/30 dark:focus-visible:ring-white/10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2.5 text-sm text-stone-700 dark:text-stone-300">
                      <Checkbox
                        checked={editIsRequired}
                        onCheckedChange={(v) => setEditIsRequired(Boolean(v))}
                      />
                      Required field
                    </label>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setEditFieldId(null)}
                        className="rounded-lg text-stone-600 hover:bg-emerald-950/5 hover:text-stone-950 dark:text-stone-400 dark:hover:bg-white/5 dark:hover:text-stone-100"
                      >
                        Cancel
                      </Button>
                      <Button className="rounded-lg bg-emerald-700 text-white hover:bg-emerald-600 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white">
                        Save changes
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <div
                  key={f.id}
                  className="group flex items-center justify-between gap-4 border-b border-stone-200 px-4 py-5 last:border-b-0 hover:bg-stone-50 dark:border-white/[0.07] dark:hover:bg-white/[0.035] sm:px-6"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <GripVertical className="size-4 shrink-0 text-stone-400 dark:text-stone-600" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-stone-900 dark:text-stone-100">
                          {f.label}
                        </p>
                        {f.isRequired ? (
                          <span className="rounded-full border border-emerald-700/20 bg-emerald-600/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-800 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-300">
                            Required
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 truncate text-xs font-medium text-stone-700 dark:text-stone-400">
                        {f.description || f.placeholder || "No description"}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="hidden rounded-full bg-emerald-950/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-stone-600 dark:bg-white/4 dark:text-stone-400 sm:block">
                      {f.type.replace("_", " / ")}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditFieldId(f.id)}
                      className="rounded-lg text-stone-600 hover:bg-emerald-950/5 hover:text-stone-950 dark:text-stone-400 dark:hover:bg-white/5 dark:hover:text-stone-100"
                    >
                      <PencilLine className="size-3.5" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                  </div>
                </div>
              ),
            )
          ) : (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex size-11 items-center justify-center rounded-2xl border border-emerald-700/20 bg-emerald-600/10 text-emerald-800 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-300">
                <Plus className="size-5" />
              </div>
              <p className="mt-4 text-sm font-medium text-stone-900 dark:text-stone-200">
                No questions yet
              </p>
              <p className="mt-1 text-xs font-medium text-stone-700 dark:text-stone-400">
                Add your first question to begin building.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
