import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlyoutMenu from './FlyoutMenu';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { removeAllCoins } from '../../store/slices/coinsSelectedSlice';
import { downloadedCSV } from '../../utils/downloadedCSV';

jest.mock('../../hooks/reduxTypedHooks');
jest.mock('../../store/slices/coinsSelectedSlice');
jest.mock('../../utils/downloadedCSV');

describe('FlyoutMenu', () => {
  const useAppSelectorMock = useAppSelector as jest.Mock;
  const useAppDispatchMock = useAppDispatch as jest.Mock;
  const dispatchMock = jest.fn();
  const downloadedCSVMock = downloadedCSV as jest.Mock;

  beforeEach(() => {
    useAppDispatchMock.mockReturnValue(dispatchMock);
    downloadedCSVMock.mockReturnValue('mockedDownloadUrl');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls removeAllCoins action on unselect all button click', () => {
    useAppSelectorMock.mockReturnValue([{ id: 1 }, { id: 2 }]);
    render(<FlyoutMenu />);
    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);
    expect(dispatchMock).toHaveBeenCalledWith(removeAllCoins());
  });

  test('renders download link with correct href and filename', () => {
    const selectedCoins = [{ id: 1 }, { id: 2 }];
    useAppSelectorMock.mockReturnValue(selectedCoins);
    render(<FlyoutMenu />);
    const downloadLink = screen.getByText('Download').closest('a');
    expect(downloadLink).toHaveAttribute('href', 'mockedDownloadUrl');
    expect(downloadLink).toHaveAttribute('download', '2 crypto coins list.csv');
  });

  test('matches snapshot', () => {
    useAppSelectorMock.mockReturnValue([{ id: 1 }, { id: 2 }]);
    const { asFragment } = render(<FlyoutMenu />);
    expect(asFragment()).toMatchSnapshot();
  });
});
