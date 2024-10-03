export type TypeUserForm = {
  firstName: string;
  email: string;
  password?: string;
};

export type TypeNoteForm = {
  title: string;
  description: string;
};

export type TypeNoteFormKey = TypeNoteForm & {
  key: string;
};
