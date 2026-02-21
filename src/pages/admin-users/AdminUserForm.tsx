import { useState, useMemo } from "react";
import { Link } from "react-router";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import type { Role } from "../../api/adminUsers";
import {
  MODULE_LEVELS,
  getLevelForModule,
  getModulePermissionKeys,
  type ModuleLevel,
} from "../../constants/permissionLevels";

export interface AdminUserFormData {
  email: string;
  password: string;
  name: string;
  role_id: number;
  is_active: boolean;
  permission_overrides: string[];
}

interface AdminUserFormProps {
  mode: "create" | "edit";
  roles: Role[];
  defaultValues?: Partial<AdminUserFormData>;
  onSubmit: (data: AdminUserFormData) => void;
  isSubmitting?: boolean;
}

const emptyFormData: AdminUserFormData = {
  email: "",
  password: "",
  name: "",
  role_id: 0,
  is_active: true,
  permission_overrides: [],
};

export default function AdminUserForm({
  mode,
  roles,
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: AdminUserFormProps) {
  const adminPanelRoles = roles.filter((r) =>
    ["super_admin", "admin", "editor", "viewer", "editor_articles", "custom"].includes(r.name)
  );
  const [formData, setFormData] = useState<AdminUserFormData>({
    ...emptyFormData,
    ...defaultValues,
    role_id: defaultValues?.role_id ?? adminPanelRoles[0]?.id ?? 0,
  });

  const levelByModule = useMemo(() => {
    const perms = formData.permission_overrides ?? [];
    const out: Record<string, ModuleLevel> = {};
    MODULE_LEVELS.forEach((m) => {
      out[m.key] = getLevelForModule(m.key, perms);
    });
    return out;
  }, [formData.permission_overrides]);

  const setModuleLevel = (moduleKey: string, level: ModuleLevel) => {
    const config = MODULE_LEVELS.find((m) => m.key === moduleKey);
    if (!config) return;
    const levelOption = config.levels.find((l) => l.value === level);
    const newPerms = levelOption ? levelOption.permissions : [];
    const moduleKeys = getModulePermissionKeys(moduleKey);
    setFormData((prev) => {
      const base = (prev.permission_overrides ?? []).filter((p) => !moduleKeys.includes(p));
      return { ...prev, permission_overrides: [...base, ...newPerms] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role_id && roles.length) {
      setFormData((prev) => ({ ...prev, role_id: roles[0].id }));
    }
    onSubmit({
      ...formData,
      role_id: formData.role_id || roles[0]?.id || 0,
    });
  };

  const submitLabel = mode === "create" ? "Create Admin User" : "Update Admin User";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
        <div className="space-y-4">
          <div>
            <Label>
              Email <span className="text-error-500">*</span>
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="admin@example.com"
              disabled={mode === "edit"}
            />
          </div>
          <div>
            <Label>
              {mode === "create" ? "Password" : "New password (leave blank to keep current)"}{" "}
              {mode === "create" && <span className="text-error-500">*</span>}
            </Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder={mode === "edit" ? "Leave blank to keep" : "Min 6 characters"}
            />
          </div>
          <div>
            <Label>Display name</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Full name"
            />
          </div>
          <div>
            <Label>
              Role <span className="text-error-500">*</span>
            </Label>
            <select
              className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
              value={formData.role_id}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  role_id: parseInt(e.target.value, 10),
                }))
              }
            >
              {adminPanelRoles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
              Role is for display only. This user gets only the permissions you check below (no base access from role).
            </p>
          </div>
          <div>
            <Label>
              Permissions <span className="text-error-500">*</span>
            </Label>
            <p className="mb-2 text-theme-xs text-gray-500 dark:text-gray-400">
              View only = list & view. Edit adds edit. Create adds create. Delete = full access. Include <strong>admin:access</strong> so they can open the panel.
            </p>
            <div className="mb-3 flex items-center gap-2">
              <input
                type="checkbox"
                id="admin_access"
                checked={formData.permission_overrides?.includes("admin:access") ?? false}
                onChange={(e) =>
                  setFormData((prev) => {
                    const perms = prev.permission_overrides ?? [];
                    if (e.target.checked) {
                      return { ...prev, permission_overrides: perms.includes("admin:access") ? perms : [...perms, "admin:access"] };
                    }
                    return { ...prev, permission_overrides: perms.filter((p) => p !== "admin:access") };
                  })
                }
                className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
              />
              <Label htmlFor="admin_access" className="!mb-0 cursor-pointer">
                admin:access (required to open admin panel)
              </Label>
            </div>
            <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50/50 p-3 dark:border-gray-700 dark:bg-gray-800/50">
              {MODULE_LEVELS.map((module) => (
                <div key={module.key} className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                  <span className="w-28 shrink-0 text-theme-sm font-medium text-gray-700 dark:text-gray-300 sm:w-32">
                    {module.name}
                  </span>
                  <select
                    className="h-9 min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 text-theme-sm focus:border-brand-300 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                    value={levelByModule[module.key] ?? "none"}
                    onChange={(e) => setModuleLevel(module.key, (e.target.value as ModuleLevel) || "none")}
                  >
                    {module.levels.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
          {mode === "edit" && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, is_active: e.target.checked }))
                }
                className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
              />
              <Label htmlFor="is_active" className="!mb-0 cursor-pointer">
                Active (user can sign in)
              </Label>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={
            isSubmitting ||
            (mode === "create" && (!formData.email || !formData.password)) ||
            (mode === "create" && (!formData.permission_overrides?.length || !formData.permission_overrides?.includes("admin:access")))
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50"
        >
          {submitLabel}
        </button>
        <Link to="/admin-users">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
