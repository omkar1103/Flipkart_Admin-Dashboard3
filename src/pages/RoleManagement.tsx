import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface RolePermissions {
  products: Permission;
  orders: Permission;
  reviews: Permission;
  analytics: Permission;
  users: Permission;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: RolePermissions;
}

const defaultPermissions: Permission = {
  view: false,
  create: false,
  edit: false,
  delete: false,
};

const defaultRolePermissions: RolePermissions = {
  products: { ...defaultPermissions },
  orders: { ...defaultPermissions },
  reviews: { ...defaultPermissions },
  analytics: { ...defaultPermissions },
  users: { ...defaultPermissions },
};

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full access to all system features',
    permissions: {
      products: { view: true, create: true, edit: true, delete: true },
      orders: { view: true, create: true, edit: true, delete: true },
      reviews: { view: true, create: true, edit: true, delete: true },
      analytics: { view: true, create: true, edit: true, delete: true },
      users: { view: true, create: true, edit: true, delete: true },
    },
  },
  {
    id: '2',
    name: 'Product Manager',
    description: 'Manage products and inventory',
    permissions: {
      products: { view: true, create: true, edit: true, delete: false },
      orders: { view: true, create: false, edit: false, delete: false },
      reviews: { view: true, create: false, edit: false, delete: false },
      analytics: { view: true, create: false, edit: false, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
    },
  },
  {
    id: '3',
    name: 'Support Staff',
    description: 'Handle customer support and reviews',
    permissions: {
      products: { view: true, create: false, edit: false, delete: false },
      orders: { view: true, create: false, edit: true, delete: false },
      reviews: { view: true, create: true, edit: true, delete: true },
      analytics: { view: false, create: false, edit: false, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
    },
  },
];

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    permissions: RolePermissions;
  }>({
    name: '',
    description: '',
    permissions: defaultRolePermissions,
  });

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setShowModal(true);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId));
    toast.success('Role deleted successfully');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRole) {
      setRoles(
        roles.map((role) =>
          role.id === editingRole.id
            ? { ...role, ...formData }
            : role
        )
      );
      toast.success('Role updated successfully');
    } else {
      const newRole: Role = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
      };
      setRoles([...roles, newRole]);
      toast.success('Role created successfully');
    }
    setShowModal(false);
    setEditingRole(null);
    setFormData({
      name: '',
      description: '',
      permissions: defaultRolePermissions,
    });
  };

  const handlePermissionChange = (
    module: keyof RolePermissions,
    permission: keyof Permission,
    checked: boolean
  ) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [module]: {
          ...formData.permissions[module],
          [permission]: checked,
        },
      },
    });
  };

  const PermissionToggle = ({
    module,
    permission,
    checked,
  }: {
    module: keyof RolePermissions;
    permission: keyof Permission;
    checked: boolean;
  }) => (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-blue-600"
        checked={checked}
        onChange={(e) =>
          handlePermissionChange(module, permission, e.target.checked)
        }
      />
      <span className="ml-2 text-sm capitalize">{permission}</span>
    </label>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
        <button
          onClick={() => {
            setEditingRole(null);
            setFormData({
              name: '',
              description: '',
              permissions: defaultRolePermissions,
            });
            setShowModal(true);
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Role</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {role.name}
                </td>
                <td className="px-6 py-4">{role.description}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(role.permissions).map(([module, perms]) => (
                      Object.entries(perms).filter(([, value]) => value).length > 0 && (
                        <span
                          key={module}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {module}
                        </span>
                      )
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditRole(role)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {editingRole ? 'Edit Role' : 'Add New Role'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingRole(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Permissions
                  </label>
                  <div className="space-y-4">
                    {(Object.keys(formData.permissions) as Array<keyof RolePermissions>).map(
                      (module) => (
                        <div
                          key={module}
                          className="border rounded-md p-4"
                        >
                          <h4 className="text-sm font-medium text-gray-700 capitalize mb-2">
                            {module}
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(Object.keys(defaultPermissions) as Array<keyof Permission>).map(
                              (permission) => (
                                <PermissionToggle
                                  key={`${module}-${permission}`}
                                  module={module}
                                  permission={permission}
                                  checked={
                                    formData.permissions[module][permission]
                                  }
                                />
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingRole(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {editingRole ? 'Update Role' : 'Create Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}