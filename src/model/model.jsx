export const STORAGE_KEYS = {
  accounts: "accounts",
  tasks: "tasks",
  tags: "tags",
  currentAccountId: "currentAccountId",
};

export const createAccount = ({ name, email, password }) => ({
  id: crypto.randomUUID(),
  name,
  email,
  password,
});

export const createTag = ({ accountId, name, color = "#4f46e5" }) => ({
  id: crypto.randomUUID(),
  accountId,
  name,
  color,
});

export const createTask = ({
  accountId,
  title,
  description = "",
  dueDate = "",
  tagIds = [],
}) => ({
  id: crypto.randomUUID(),
  accountId,
  title,
  description,
  dueDate,
  complete: false,
  tagIds,
});