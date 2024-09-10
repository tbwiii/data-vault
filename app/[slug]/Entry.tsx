"use client";
import { useState } from "react";
import { EntryType } from "@schema/entries";
import { useForm } from "@mantine/form";
import {
  IconEdit,
  IconLink,
  IconClockEdit,
  IconCalendar,
  IconTrash,
  IconCancel,
  IconDeviceFloppy,
  IconStack2,
  IconLock,
  IconLockOpen,
} from "@tabler/icons-react";
import { EntryForm, EntryFormTitle, EntryFormBody } from "./EntryForm";
import MenuBar from "./menu-bar";
import { MenuButtonType } from "./menu-bar";
import Markdown from "react-markdown";
import BlurFade from "@/components/magicui/blur-fade";
import HyperText from "@/components/magicui/hyper-text";
import slugOMatic from "@util/slugOMatic";
import Meta from "./Meta";
import remarkGfm from "remark-gfm";
import api from "@lib/api";
import { EntryPropsType } from "@lib/types";

const confirmDelete = async (entryId: number) => {
  if (!confirm("Are you sure you want to delete this entry?")) {
    console.log("cancelled");
    return;
  }

  try {
    await api.$delete(`/entry/`, { entryId });
    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
};

const Entry = (props: EntryPropsType) => {
  const [editing, setEditing] = useState(!props.entry?.entryId);
  const [metaVisible, setMetaVisible] = useState(false);
  const [entry, setEntry] = useState(props.entry);

  const saveEntry = async (values: Partial<EntryType>) => {
    if (!values.entryId) {
      return await api.$post("/entry", values);
    } else {
      return await api.$put(`/entry`, values);
    }
  };

  const entryFormObj = useForm({
    initialValues: {
      title: "new",
      body: "",
      slug: "",
      owner: props.user?.email ?? null,
      private: false,
    },
  });

  if (entry?.entryId) {
    entryFormObj.initialize(entry);
  }

  const submit = async (values: Partial<EntryType>) => {
    try {
      const { entry } = await saveEntry(values);
      setEntry(entry);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const buttons: MenuButtonType[] = [
    {
      label: "Edit",
      icon: IconEdit,
      classes: "hover:bg-sky-900 hover:text-sky-200",
      visible: !editing && props.user?.email === entry?.owner,
      onClick: () => setEditing(true),
    },
    {
      label: props.user ? "Save" : "Login to Save",
      icon: IconDeviceFloppy,
      classes: "hover:bg-sky-900 hover:text-sky-200",
      visible: editing,
      disabled: !entryFormObj.isDirty() || !props.user,
      type: "submit",
    },
    {
      label: "Meta",
      icon: IconStack2,
      classes: "",
      visible: true,
      onClick: () => setMetaVisible(!metaVisible),
    },
    {
      label: "Cancel",
      icon: IconCancel,
      classes: "hover:bg-orange-900 hover:text-orange-200",
      visible: editing,
      disabled: !entry,
      onClick: () => setEditing(false),
    },
    {
      label: "Delete",
      icon: IconTrash,
      classes: "hover:bg-red-900 hover:text-red-200",
      visible: editing,
      onClick: () => confirmDelete(entry.entryId),
    },
  ];
  const slugPlaceholder = slugOMatic(entryFormObj.values?.title) ?? null;

  const metadataArr = [
    {
      label: "Slug",
      value: entry?.slug ?? slugPlaceholder,
      icon: <IconLink size="16" />,
    },
    {
      label: "Access",
      value: entry?.private ? "Private" : "Public",
      icon: entry?.private ? (
        <IconLock size="16" />
      ) : (
        <IconLockOpen size="16" />
      ),
    },
    {
      label: "Created",
      value: entry?.createdAt || "--",
      icon: <IconCalendar size="16" />,
    },
    {
      label: "Updated",
      value: entry?.updatedAt || "--",
      icon: <IconClockEdit size="16" />,
    },
  ];

  return (
    <div>
      <EntryForm form={entryFormObj} submit={submit}>
        <div className="relative flex items-center min-h-40">
          <div className="container m-auto ">
            {!editing && (
              <HyperText text={entry.title ?? "New Entry"} flipCards />
            )}
            {editing && (
              <BlurFade delay={0.15} yOffset={-6} inView>
                <EntryFormTitle form={entryFormObj} />
              </BlurFade>
            )}
          </div>
        </div>
        <div className="grid mb-8">
          <div className="container m-auto">
            <div className="rounded bg-azure-700 bg-opacity-30 p-2">
              <MenuBar buttons={buttons} />
            </div>
          </div>
          {metaVisible && (
            <BlurFade delay={0.15} yOffset={-6} inView>
              <div className="container m-auto">
                <div
                  className="relative
                  bg-azure-700
                  bg-opacity-15
                  border
                  border-dashed
                  border-azure-600
                  rounded
                  text-azure-300"
                >
                  <Meta
                    className="p-8"
                    metadataArr={metadataArr}
                    editing={editing}
                    form={entryFormObj}
                  />
                </div>
              </div>
            </BlurFade>
          )}
        </div>
        <div>
          <div
            className={`container m-auto grid gap-8 transition-all ${editing ? "" : "-translate-x-1/2"}`}
          >
            <div className="grid gap-10 grid-cols-2">
              <EntryFormBody
                className={`${editing ? "" : "opacity-0"}`}
                form={entryFormObj}
              />
              <Markdown
                className={`markdown-body p-4 text-gray-200 ${editing ? "bg-azure-700 bg-opacity-5 p-8" : ""}`}
                remarkPlugins={[remarkGfm]}
              >
                {entryFormObj.values.body}
              </Markdown>
            </div>
          </div>
        </div>
      </EntryForm>
    </div>
  );
};

export default Entry;
