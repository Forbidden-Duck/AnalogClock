import * as themeLoader from "../app/themeLoader";
const themesJSON = themeLoader.getThemes();
const themes = [];
for (const item of Object.values(themesJSON)) {
    themes.push({ name: item.info.display });
}

function SettingsPage(props) {
    return (
        <Page>
            <Section
                title={<Text bold align="center">THEME</Text>}>
                <Select
                    label={`Selected`}
                    settingsKey="theme"
                    options={
                        themes
                    }
                />
            </Section>
        </Page>
    );
}

registerSettingsPage(SettingsPage);