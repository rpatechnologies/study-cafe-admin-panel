/**
 * Permission levels per module: view < edit < create < delete.
 * Selecting a level grants that level and all lower levels (e.g. Edit grants View).
 */

export type ModuleLevel = "none" | "view" | "edit" | "create" | "delete";

export interface ModuleLevelOption {
  value: ModuleLevel;
  label: string;
  permissions: string[];
}

export interface ModuleConfig {
  key: string;
  name: string;
  levels: ModuleLevelOption[];
}

/** Permissions for each level per module. Higher level includes all lower. */
export const MODULE_LEVELS: ModuleConfig[] = [
  {
    key: "articles",
    name: "Articles",
    levels: [
      { value: "none", label: "None", permissions: [] },
      { value: "view", label: "View only", permissions: ["articles:list", "articles:view"] },
      { value: "edit", label: "Edit (includes view)", permissions: ["articles:list", "articles:view", "articles:edit"] },
      { value: "create", label: "Create (includes view, edit)", permissions: ["articles:list", "articles:view", "articles:edit", "articles:create"] },
      { value: "delete", label: "Delete / Full", permissions: ["articles:list", "articles:view", "articles:edit", "articles:create", "articles:delete"] },
    ],
  },
  {
    key: "content",
    name: "Page Content",
    levels: [
      { value: "none", label: "None", permissions: [] },
      { value: "view", label: "View only", permissions: ["content:list", "content:view"] },
      { value: "edit", label: "Edit (includes view)", permissions: ["content:list", "content:view", "content:edit"] },
    ],
  },
  {
    key: "seo",
    name: "SEO Metadata",
    levels: [
      { value: "none", label: "None", permissions: [] },
      { value: "view", label: "View only", permissions: ["seo:list", "seo:view"] },
      { value: "edit", label: "Edit (includes view)", permissions: ["seo:list", "seo:view", "seo:edit"] },
      { value: "create", label: "Create (includes view, edit)", permissions: ["seo:list", "seo:view", "seo:edit", "seo:create"] },
      { value: "delete", label: "Delete / Full", permissions: ["seo:list", "seo:view", "seo:edit", "seo:create", "seo:delete"] },
    ],
  },
  {
    key: "memberships",
    name: "Memberships",
    levels: [
      { value: "none", label: "None", permissions: [] },
      { value: "view", label: "View only", permissions: ["memberships:list", "memberships:view"] },
      { value: "edit", label: "Edit (includes view)", permissions: ["memberships:list", "memberships:view", "memberships:edit"] },
      { value: "create", label: "Create (includes view, edit)", permissions: ["memberships:list", "memberships:view", "memberships:edit", "memberships:create"] },
      { value: "delete", label: "Delete / Full", permissions: ["memberships:list", "memberships:view", "memberships:edit", "memberships:create", "memberships:delete"] },
    ],
  },
  {
    key: "testimonials",
    name: "Testimonials",
    levels: [
      { value: "none", label: "None", permissions: [] },
      { value: "view", label: "View only", permissions: ["testimonials:list", "testimonials:view"] },
      { value: "edit", label: "Edit (includes view)", permissions: ["testimonials:list", "testimonials:view", "testimonials:edit"] },
      { value: "create", label: "Create (includes view, edit)", permissions: ["testimonials:list", "testimonials:view", "testimonials:edit", "testimonials:create"] },
      { value: "delete", label: "Delete / Full", permissions: ["testimonials:list", "testimonials:view", "testimonials:edit", "testimonials:create", "testimonials:delete"] },
    ],
  },
  {
    key: "faq",
    name: "FAQ",
    levels: [
      { value: "none", label: "None", permissions: [] },
      { value: "view", label: "View only", permissions: ["faq:list", "faq:view"] },
      { value: "edit", label: "Edit (includes view)", permissions: ["faq:list", "faq:view", "faq:edit"] },
      { value: "create", label: "Create (includes view, edit)", permissions: ["faq:list", "faq:view", "faq:edit", "faq:create"] },
      { value: "delete", label: "Delete / Full", permissions: ["faq:list", "faq:view", "faq:edit", "faq:create", "faq:delete"] },
    ],
  },
  {
    key: "admin_users",
    name: "Admin Users",
    levels: [
      { value: "none", label: "None", permissions: [] },
      { value: "view", label: "View only", permissions: ["admin_users:list", "admin_users:view"] },
      { value: "edit", label: "Edit (includes view)", permissions: ["admin_users:list", "admin_users:view", "admin_users:edit"] },
      { value: "create", label: "Create (includes view, edit)", permissions: ["admin_users:list", "admin_users:view", "admin_users:edit", "admin_users:create"] },
      { value: "delete", label: "Delete / Full", permissions: ["admin_users:list", "admin_users:view", "admin_users:edit", "admin_users:create", "admin_users:delete"] },
    ],
  },
];

/** Get the effective level for a module from a list of permissions (e.g. from API). */
export function getLevelForModule(moduleKey: string, permissions: string[]): ModuleLevel {
  const config = MODULE_LEVELS.find((m) => m.key === moduleKey);
  if (!config) return "none";
  const perms = new Set(permissions);
  for (let i = config.levels.length - 1; i >= 0; i--) {
    const level = config.levels[i];
    if (level.value === "none") continue;
    if (level.permissions.every((p) => perms.has(p))) return level.value as ModuleLevel;
  }
  return "none";
}

/** Get all permission keys that belong to a module (for replacing when level changes). */
export function getModulePermissionKeys(moduleKey: string): string[] {
  const config = MODULE_LEVELS.find((m) => m.key === moduleKey);
  if (!config) return [];
  const keys = new Set<string>();
  config.levels.forEach((l) => l.permissions.forEach((p) => keys.add(p)));
  return [...keys];
}
