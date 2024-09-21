class RoleControl {
    static menuHasRole(menu: any): boolean {
        if (menu.path === '/') {
            return true;
        }

        if (menu.roles) {
            return this.hasRole(menu.roles);
        }
        return true;
    }

    static hasRole(roles: string[]): boolean {

        const authorities = localStorage.getItem('authorities');
        const authentications = authorities ? JSON.parse(authorities as string) : [];

        for (let i = 0; i < roles.length; i++) {
            if (authentications.indexOf(roles[i]) !== -1) {
                return true;
            }
        }
        return false;
    }

}


export default RoleControl;
