import Sidebar from '@/components/Sidebar';
import MapView from '@/features/MapView';
import {
  BuildingOffice2Icon,
  MapIcon,
  QuestionMarkCircleIcon,
  TableCellsIcon,
} from '@heroicons/react/24/solid';
import MainPage from '@/pages/MainPage';
import TollMatrixPage from '@/pages/TollMatrixPage';
import FaqPage from '@/pages/FaqPage';
import { useState } from 'react';
import clsx from 'clsx';
import TollGatesPage from './pages/TollGatesPage';

// TODO: Improve navigation system

function App() {
  const [pageIndex, setPageIndex] = useState(0);

  const renderPage = () => {
    switch (pageIndex) {
      case 0:
        return <MainPage />;
      case 1:
        return <TollMatrixPage />;
      case 2:
        return <TollGatesPage />;
      case 3:
        return <FaqPage />;
      default:
        return <MainPage />;
    }
  };

  const sidebarWidth = pageIndex === 1 ? 'xl:w-1/2' : 'xl:w-1/3';

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden">
        <Sidebar
          className={clsx(
            'scrollbar-hide absolute bottom-0 z-10 h-1/2 w-full gap-1 overflow-auto transition-all xl:left-0 xl:h-full',
            sidebarWidth,
          )}
        >
          <div className="mt-2 flex w-full justify-center">
            <ul className="menu menu-horizontal bg-base-200 rounded-box">
              <li>
                <a
                  className={`tooltip tooltip-bottom`}
                  data-tip="Home"
                  onClick={() => setPageIndex(0)}
                >
                  <MapIcon className="size-6" />
                </a>
              </li>
              <li>
                <a
                  className={`tooltip tooltip-bottom`}
                  data-tip="Toll Matrix"
                  onClick={() => setPageIndex(1)}
                >
                  <TableCellsIcon className="size-6" />
                </a>
              </li>
              <li>
                <a
                  className={`tooltip tooltip-bottom`}
                  data-tip="Toll Gates"
                  onClick={() => setPageIndex(2)}
                >
                  <BuildingOffice2Icon className="size-6" />
                </a>
              </li>
              <li>
                <a
                  className={`tooltip tooltip-bottom`}
                  data-tip="FAQ"
                  onClick={() => setPageIndex(3)}
                >
                  <QuestionMarkCircleIcon className="size-6" />
                </a>
              </li>
            </ul>
          </div>
          {renderPage()}
        </Sidebar>

        <div className="h-full w-full">
          <MapView />
        </div>
      </div>
    </>
  );
}

export default App;
