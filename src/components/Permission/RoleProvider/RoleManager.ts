
interface Role {
    key: string;
    children?: Role[];
}

class RoleManager {
    private roles: Role[] = [];

    private static manager = new RoleManager();

    static getInstances(): RoleManager {
        return RoleManager.manager;
    }

    addRole(role: Role): void {
        this.roles.push(role);
    }

    public hasRole(code: string) {
        return this.roles.some((role: Role) => {
            return role.key === code;
        })
    }
}

export default RoleManager;