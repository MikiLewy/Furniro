import ClientBottomTabsNavigator from './bottom-tabs-navigator.client';

const ServerBottomTabsNavigator = () => {
  return (
    <div className="fixed bottom-0 px-2 left-0  right-0 border-t border-border bg-white flex md:hidden">
      <ClientBottomTabsNavigator />
    </div>
  );
};

export default ServerBottomTabsNavigator;
