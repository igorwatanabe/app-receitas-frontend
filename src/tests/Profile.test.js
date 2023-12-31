import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from '../helper/renderWithRouterAndContext';

describe('Testando a pagina Profile', () => {
  it('Verifica se o email do usuario foi renderizado corretamente', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'zigivibek@mailinator.com' }));
    renderWithRouterAndContext(<App />, '/profile');

    screen.getByText('zigivibek@mailinator.com');
    // screen.debug();
  });

  it('Verifica se ao clicar no botao Done Recipes e redirecionado corretamente', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    const doneButton = screen.getByTestId('profile-done-btn');
    // screen.debug();

    userEvent.click(doneButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  it('Verifica se ao clicar no botao Favorite Recipes e redirecionado corretamente', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    // screen.debug();

    userEvent.click(favoriteButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  it('Verifica se ao clicar no botao Logout e redirecionado corretamente', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    const logoutButton = screen.getByTestId('profile-logout-btn');
    // screen.debug();

    userEvent.click(logoutButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
