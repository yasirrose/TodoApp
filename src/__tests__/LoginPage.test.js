/**
 * @jest-environment jsdom
 */
import { store } from '../store/main.store'
import { Provider } from 'react-redux'
import { expect, test } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import { RouterProvider } from "react-router-dom"
import { router } from '../App'
import { mswServer } from '../mocks/server'
import 'cross-fetch/polyfill'



beforeAll(() => {
    global.fetch = fetch
    mswServer.listen()
})

afterEach(() => {
    mswServer.resetHandlers()
})

afterAll(() => {
    mswServer.close()
})


describe('Todo Component.', () => {
    
    test('redirects to todo component if credentials are good.', async () => {
        localStorage.setItem('accessToken', 'randomaccesstoken')
        
        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        )

        await waitFor(() => {
          expect(screen.getByTestId('todotabletestid')).toBeDefined()
        })
            
    })

})

