import { useMutation } from '@tanstack/react-query';
import { loginService } from '../services';

export const useLogin = () => useMutation({ mutationFn: loginService });
