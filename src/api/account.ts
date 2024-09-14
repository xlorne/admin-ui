import {post} from "@/api/index";

export async function login(body: Account.LoginRequest) {
    return post('/user/login', body);
}
