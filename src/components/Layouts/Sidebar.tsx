import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuChat from '../Icon/Menu/IconMenuChat';
import IconMenuMailbox from '../Icon/Menu/IconMenuMailbox';
import IconMenuTodo from '../Icon/Menu/IconMenuTodo';
import IconMenuNotes from '../Icon/Menu/IconMenuNotes';
import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
import IconMenuContacts from '../Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuCalendar from '../Icon/Menu/IconMenuCalendar';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuCharts from '../Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import IconMenuFontIcons from '../Icon/Menu/IconMenuFontIcons';
import IconMenuDragAndDrop from '../Icon/Menu/IconMenuDragAndDrop';
import IconMenuTables from '../Icon/Menu/IconMenuTables';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '../Icon/Menu/IconMenuAuthentication';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';
import IconCalendar from '../Icon/IconCalendar';
import IconFolder from '../Icon/IconFolder';
import IconListCheck from '../Icon/IconListCheck';
import IconInfoCircle from '../Icon/IconInfoCircle';
import IconNotesEdit from '../Icon/IconNotesEdit';
import IconNotes from '../Icon/IconNotes';
import IconChecks from '../Icon/IconChecks';
import IconGlobe from '../Icon/IconGlobe';
import IconCreditCard from '../Icon/IconCreditCard';
import IconDollarSignCircle from '../Icon/IconDollarSignCircle';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.png" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-bold align-middle lg:inline dark:text-white-light">{t('FSRECON')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard
                                         className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                    </div>

                                    <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/">{t('For Your Information')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/analytics">{t('Conference')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/finance">{t('Networking')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Main Menu')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'new submissions' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('new submissions')}>
                                            <div className="flex items-center">
                                                <IconNotes duotone fill className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('New Submission')}</span>
                                            </div>

                                            <div className={currentMenu !== 'invoice' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'new submissions' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/apps/invoice/list">{t('Submit New Manuscript')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/preview">{t('Submissions Sent Back to Author ')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/add">{t('Incomplete Submissions')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/edit">{t("Submissions Waiting for Author's Approval")}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/edit">{t("Submissions Being Processed")}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'revisions' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('revisions')}>
                                            <div className="flex items-center">
                                                <IconNotesEdit fill duotone className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Revisions')}</span>
                                            </div>

                                            <div className={currentMenu !== 'revisions' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'revisions' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/apps/invoice/list">{t('Submissions Needing Revision')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/preview">{t('Revisions Sent Back to Author')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/add">{t('Incomplete Submissions Being Revised')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/edit">{t("Revisions Waiting for Author's Approval")}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/edit">{t("Revisions Being Processed")}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/edit">{t("Declined Revisions")}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'completed' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('completed')}>
                                            <div className="flex items-center">
                                                <IconChecks className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Completed')}</span>
                                            </div>

                                            <div className={currentMenu !== 'completed' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'completed' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/apps/invoice/list">{t('Submissions with a Decision')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/preview">{t('Submissions with Production Completed')}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                </ul>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('About')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'about' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('about')}>
                                    <div className="flex items-center">
                                        <IconInfoCircle duotone fill className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('About')}</span>
                                    </div>

                                    <div className={currentMenu !== 'about' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'about' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/components/tabs">{t('tabs')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/accordions">{t('accordions')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/modals">{t('modals')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/charts" className="group">
                                    <div className="flex items-center">
                                        <IconListCheck duotone fill className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('List of Journal')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/charts" className="group">
                                    <div className="flex items-center">
                                        <IconCalendar duotone fill className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Calender')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Billing')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink to="/tables" className="group">
                                    <div className="flex items-center">
                                        <IconCreditCard duotone fill className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Payments')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'ticket' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('ticket')}>
                                    <div className="flex items-center">
                                        <IconDollarSignCircle duotone fill className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Tickets')}</span>
                                    </div>

                                    <div className={currentMenu !== 'datalabel' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'ticket' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/datatables/basic">{t('basic')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/advanced">{t('advanced')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/skin">{t('skin')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/order-sorting">{t('order_sorting')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('help')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink to="/tables" className="group">
                                    <div className="flex items-center">
                                        <IconMenuTables className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Knowledgebase')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'video tutorial' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('video tutorial')}>
                                    <div className="flex items-center">
                                        <IconMenuDatatables className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Video Tutorials')}</span>
                                    </div>

                                    <div className={currentMenu !== 'datalabel' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'video tutorial' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/datatables/basic">{t('basic')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/advanced">{t('advanced')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/skin">{t('skin')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/order-sorting">{t('order_sorting')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
