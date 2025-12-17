import DisplayUserTheme from "./DisplayUserTheme";
import { defaultAppContext, themes } from "./DisplayUserTheme.test.data";

export default {
  title: "Components/UserSetting/DisplayUserTheme",
  component: DisplayUserTheme,
};

const context = defaultAppContext();
context.port.addRequestListener("passbolt.themes.find-all", () => themes);

export const Initial = {
  args: { context },
};
