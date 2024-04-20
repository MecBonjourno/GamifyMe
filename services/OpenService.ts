class OpenService {
    
    public async get<TResponse, TBody>(route: string, body?: TBody): Promise<TResponse> {
        return this.request<TResponse, TBody>('GET', route, body, undefined);
    }

    public async post<TResponse, TBody>(route: string, body: TBody): Promise<TResponse> {
        return this.request<TResponse, TBody>('POST', route, body, undefined);
    }

    public async put<TResponse, TBody>(route: string, body: TBody): Promise<TResponse> {
        return this.request<TResponse, TBody>('PUT', route, body, undefined);
    }

    protected async request<TResponse, TBody>(method: 'GET' | 'POST' | 'PUT', route: string, body?: TBody, additionalHeaders?: HeadersInit): Promise<TResponse> {

        const url = process.env.NEXT_PUBLIC_BASE_URL || "";
        
        const headers = new Headers({
            ...additionalHeaders,
            'x-api-key': process.env.NEXT_PUBLIC_R_INSPECT_X_API_KEY || '',
        });

        if (method === 'POST' || method === 'PUT') {
            headers.append('Content-Type', 'application/json');
        }

        try {
            const response = await fetch(`${url}/${route}`, {
                method: method,
                headers: headers,
                body: (method === 'POST' || method === 'PUT') && body ? JSON.stringify(body) : null,
            });
            return this.handleResponse<TResponse>(response, method, url, body, additionalHeaders);
        } catch (error) {
            throw new Error(`Authenticated request failed: ${error}`);
        }
    }


    private async handleResponse<T>(response: Response, method: 'GET' | 'POST' | 'PUT', route: string, body?: any, additionalHeaders?: HeadersInit): Promise<T> {
        if (response.status === 403) {
            throw new Error('Access denied. You do not have permission to access this resource.');
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<T>;
    }
}

export default OpenService;