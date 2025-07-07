import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Todo } from './index';

describe('Todo Component', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    test('renders initial tasks', () => {
        render(<Todo />);
        expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
        expect(screen.getByText('Прекрасный код')).toBeInTheDocument();
        expect(screen.getByText('Покрытие тестами')).toBeInTheDocument();
    });

    test('adds new task', () => {
        render(<Todo />);
        const input = screen.getByPlaceholderText('What needs to be done?');
        const addButton = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'Новая задача' } });
        fireEvent.click(addButton);

        expect(screen.getByText('Новая задача')).toBeInTheDocument();
    });

    test('toggles task completion', async () => {
        render(<Todo />);

        const checkboxes = screen.getAllByRole('checkbox');
        const firstCheckbox = checkboxes[0];

        expect(firstCheckbox).toBeChecked();

        fireEvent.click(firstCheckbox);

        expect(firstCheckbox).not.toBeChecked();

        const taskText = screen.getByText('Тестовое задание');

        await waitFor(() => {
            expect(taskText).not.toHaveStyle('text-decoration: line-through');
        });
    });

    test('filters tasks', () => {
        render(<Todo />);

        fireEvent.click(screen.getByText('Active'));
        expect(screen.getByText('Покрытие тестами')).toBeInTheDocument();
        expect(screen.queryByText('Тестовое задание')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Completed'));
        expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
        expect(screen.queryByText('Покрытие тестами')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('All'));
        expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
        expect(screen.getByText('Покрытие тестами')).toBeInTheDocument();
    });

    test('clears completed tasks', () => {
        render(<Todo />);
        fireEvent.click(screen.getByText('Clear completed'));

        expect(screen.queryByText('Тестовое задание')).not.toBeInTheDocument();
        expect(screen.getByText('Покрытие тестами')).toBeInTheDocument();
    });

    test('saves tasks to localStorage', () => {
        render(<Todo />);
        const input = screen.getByPlaceholderText('What needs to be done?');
        fireEvent.change(input, { target: { value: 'Проверка localStorage' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        const savedTasks = JSON.parse(window.localStorage.getItem('todo-tasks') || '[]');
        expect(savedTasks.some((task: any) => task.title === 'Проверка localStorage')).toBeTruthy();
    });
});