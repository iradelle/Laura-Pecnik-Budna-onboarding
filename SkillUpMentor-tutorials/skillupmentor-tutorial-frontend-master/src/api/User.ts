import { apiRoutes } from "constants/apiConstants";
import { apiRequest } from "./Api";
import { LoginUserFields } from "hooks/react-hook-form/userLogin";
import { UserType } from "models/auth";
import { RegisterUserFields } from "hooks/react-hook-form/userRegister";

export const fetchUser = async () => apiRequest<undefined, UserType>('get', apiRoutes.FETCH_USER)

export const signout = async () => apiRequest<undefined, void>('post', apiRoutes.SIGNOUT)

export const login = async (data: LoginUserFields) => apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data)

export const register = async (data: RegisterUserFields) => apiRequest<RegisterUserFields, UserType>('post', apiRoutes.LOGIN, data)

export const uploadAvatar = async (formData: FormData, id: string) =>
    apiRequest<FormData, void>(
        'post',
        `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${id}`,
        formData
    )

