import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Testing App component', () => { 
    test('App is working', async () => {
        render(<App />);
        const headerElement = screen.getByText('Mini Dictionary');
        expect(headerElement).toBeInTheDocument();
    })

    test('Alert is working', async () => {
        render(<App />);
        window.alert = jest.fn();
        window.alert.mockClear();
    })

    test('Success test case', async () => {
        render(<App />);

        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);

        await waitFor(() => {
            expect(screen.getByRole('heading')).toBeInTheDocument();
        });
    });

    test('Error test case', async () => {
        render(<App />);

        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);

        await waitFor(() => {
            expect(screen.getByRole('heading')).toBeInTheDocument();
        })
    })
})