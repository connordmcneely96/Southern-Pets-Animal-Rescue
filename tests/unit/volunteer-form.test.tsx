import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { VolunteerForm } from '../../apps/web/components/volunteer-form';

vi.mock('../../apps/web/mutations/register-volunteer', () => ({
  registerVolunteer: vi.fn().mockResolvedValue({ ok: true })
}));

describe('VolunteerForm', () => {
  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<VolunteerForm />);

    await user.click(screen.getByRole('button', { name: /submit interest/i }));

    expect(await screen.findAllByText(/please/i)).toHaveLength(1);
  });
});
