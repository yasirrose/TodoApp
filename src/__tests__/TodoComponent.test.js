/**
 * @jest-environment jsdom
 */

import { store } from '../store/main.store'
import { Provider } from 'react-redux'
import { expect, test } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import { RouterProvider } from "react-router-dom"
import { router } from '../App'
import 'cross-fetch/polyfill'


describe("Test for default login", () => {
    test('Without Token given, component should be login.', async () => {
    render(
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
        )
        expect(screen.getByTestId('loginformtestid')).toBeDefined()
    
    })
})