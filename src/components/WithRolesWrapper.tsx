'use client'

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getCookie, hasCookie } from 'cookies-next';
import { decrypt } from "@/utils/cryptoUtils";
import { SessionCookiesContext } from "@/contexts";

function hasRequiredPermissions(requiredPermissions: string[], userRole: string): boolean {
    return requiredPermissions.includes(userRole);
}

export function withRoles(Component: any, requiredPermissions: string[]) {
    return function WithRolesWrapper(props: any) {
        const cookies = useContext(SessionCookiesContext);
        const [hasPermission, setPermission] = useState<boolean>(false);
        const router = useRouter();
        
        useEffect(() => {
            const session = JSON.parse(cookies.value);
            
            if (!session) {
                router.push("/");
                return;
            }

            const result = hasRequiredPermissions(requiredPermissions, session.role);
            setPermission(result);

            if (!result) {
                console.log("User dont have permision", session.role);
                switch (session.role) {
                    case "asistent":
                        router.push("/users");
                        break;
                    case "pacient":
                    case "specialist":
                        router.push("/todo");
                        break;
                }
            }
        }, []);

        return hasPermission ? <Component {...props} /> : null;
    };
}
