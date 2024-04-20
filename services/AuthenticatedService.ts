import { LocalStorageKeys } from '@/constants/localStorageKeys';

class AuthenticatedService {

    public async get<TResponse, TBody>(route: string, body?: TBody): Promise<TResponse> {
        return this.request<TResponse, TBody>('GET', route, body, undefined);
    }

    public async post<TResponse, TBody>(route: string, body: TBody): Promise<TResponse> {
        return this.request<TResponse, TBody>('POST', route, body, undefined);
    }

    public async put<TResponse, TBody>(route: string, body: TBody): Promise<TResponse> {
        return this.request<TResponse, TBody>('PUT', route, body, undefined);
    }

    public async patch<TResponse, TBody>(route: string, body: TBody): Promise<TResponse> {
        return this.request<TResponse, TBody>('PATCH', route, body, undefined);
    }

    public async delete<TResponse, TBody>(route: string, body?: TBody): Promise<TResponse> {
        return this.request<TResponse, TBody>('DELETE', route, body, undefined);
    }

    protected async request<TResponse, TBody>(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', route: string, body?: TBody, additionalHeaders?: HeadersInit): Promise<TResponse> {
        const authHeader = this.createAuthHeader();

        const url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

        const headers = new Headers({
            ...additionalHeaders,
            ...authHeader,
            'x-api-key':  '1234567890',
        });

        headers.append('Content-Type', 'application/json');

        try {
            const response = await fetch(`${url}/${route}`, {
                method: method,
                headers: headers,
                body: body ? JSON.stringify(body) : null,
            });
            return this.handleResponse<TResponse>(response, method, url, body, additionalHeaders);
        } catch (error) {
            throw new Error(`Authenticated request failed: ${error}`);
        }
    }


    private async handleResponse<T>(response: Response, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', route: string, body?: any, additionalHeaders?: HeadersInit): Promise<T> {
        if (response.status === 401) {

            const refreshed = await this.refreshToken();
            if (refreshed) {
                return this.request(method, route, body, additionalHeaders);
            } else {
                throw new Error('Authentication failed. Please login again.');
            }
        } else if (response.status === 403) {
            throw new Error('Access denied. You do not have permission to access this resource.');
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<T>;
    }

    private createAuthHeader(): HeadersInit {
        return {
            'Authorization': `Bearer ${localStorage.getItem(LocalStorageKeys.AccessToken)}`,
        };
    }

    private async refreshToken(): Promise<boolean> {
        const refreshToken = localStorage.getItem(LocalStorageKeys.RefreshToken);

        if (!refreshToken) {
            return false;
        }

        try {
            const response = await fetch('/path/to/refresh/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken: refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token.');
            }

            const data = await response.json();
            localStorage.setItem(LocalStorageKeys.AccessToken, data.accessToken);
            return true;
        } catch (error) {
            console.error('Refresh token failed:', error);
            return false;
        }
    }

}

export default AuthenticatedService;
