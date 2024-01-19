'use client';
import { Dialog, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

import Container from '@/components/Container';

const menuItems = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Paldeck',
    link: '/paldeck',
  },
  {
    label: 'Item Drops',
    link: '/item-drops',
  },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white drop-shadow-md">
      <nav aria-label="Global">
        <Container customClass="w-full flex items-center justify-between">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span>Paldeck</span>
              {/* <picture className="h-8 w-auto">
              <source srcSet="images/logo.webp" type="image/webp" />
              <source srcSet="images/logo.png" type="image/png" />
              <img
                src="images/logo.png"
                style={{ height: 'inherit' }}
                alt="palworld logo"
              />
            </picture> */}
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            {menuItems.map((i) => (
              <Link
                key={`menu_item_desktop_${i.link}`}
                href={i.link}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {i.label}
              </Link>
            ))}
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end"> </div>
        </Container>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {menuItems.map((i) => (
                  <Link
                    key={`menu_item_desktop_${i.link}`}
                    href={i.link}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
