import { fireEvent, render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import CoinCard from './CoinCard';

// jest.mock('../api/api');
// const mockCoinData = {
//   uuid: '1',
//   name: 'Bitcoin',
//   symbol: 'BTC',
//   price: '35000',
//   rank: 1,
//   iconUrl: 'https://example.com/bitcoin-icon.png',
//   change: '5',
//   description: 'This is a cryptocurrency.',
// };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CoinCard component', () => {
  it.todo('displays detailed coin information when loaded');
  //  async () => {
  //   (api.getCoin as jest.Mock).mockResolvedValueOnce({
  //     data: { coin: mockCoinData },
  //   });

  //   await act(async () => {
  //     render(
  //       <MemoryRouter initialEntries={['/coins/1']}>
  //         <Routes>
  //           <Route path="/coins/:coinId" element={<CoinCard />} />
  //         </Routes>
  //       </MemoryRouter>
  //     );
  //   });

  //   await act(async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //   });

  //   expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
  //   expect(screen.getByText(/BTC/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Rank 1/i)).toBeInTheDocument();
  //   expect(screen.getByText(/\$ 35000.0000000/i)).toBeInTheDocument();
  //   expect(screen.getByText(/5%/i)).toBeInTheDocument();
  //   expect(screen.getByText(/This is a cryptocurrency./i)).toBeInTheDocument();
  // });
  it('closes the component when close button is clicked', async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    const { getByAltText } = render(
      <MemoryRouter initialEntries={['/coins/1']}>
        <Routes>
          <Route path="/coins/:coinId" element={<CoinCard />} />
        </Routes>
      </MemoryRouter>
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const closeButton = getByAltText('close');
    act(() => {
      fireEvent.click(closeButton);
    });
    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
