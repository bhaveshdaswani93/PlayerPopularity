import * as React from "react"
import { FlatList, TextStyle, View, ViewStyle, Image } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../components/screen"
import { Text } from "../components/text"
import { Wallpaper } from "../components/wallpaper"
import { Header } from "../components/header"
import { color, spacing } from "../theme"
import { inject, observer } from "mobx-react"
import { RootStore } from "../models"
import { Button } from "../components/button/button"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}
const PLAYER: ViewStyle = {
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 16,
  paddingRight: 16,
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
}

export interface PlayersScreenProps extends NavigationScreenProps<{}> {
  rootStore: RootStore
}

@inject("rootStore")
@observer
export class PlayersScreen extends React.Component<PlayersScreenProps, {}> {
  goBack = () => this.props.navigation.goBack(null)

  render() {
    const { players } = this.props.rootStore
    return (
      <View testID="PlayersScreen" style={FULL}>
        <Wallpaper />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx="secondExampleScreen.howTo"
            leftIcon="back"
            onLeftPress={this.goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Text style={TITLE} preset="header" tx="secondExampleScreen.title" />
          <FlatList
            data={players}
            renderItem={({ item }) => (
              <Button preset={"link"} style={PLAYER}>
                <Image
                  source={{ uri: item.imgURL }}
                  style={{ width: 40, height: 40, marginRight: 16 }}
                />
                <Text text={item.name} style={{ flex: 1, fontSize: 20 }} />
              </Button>
            )}
            keyExtractor={item => item.imgURL}
          />
        </Screen>
      </View>
    )
  }
}