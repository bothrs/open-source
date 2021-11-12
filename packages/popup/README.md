# Popup

A set of hooks, types and a context to make a popup globally available in a React Native app.

## Getting started

### Install package

`yarn add @bothrs/popup`

### Wrap your app with the context in the `app.tsx``

```
import { PopupContext, usePopupState } from '@bothrs/popup'

export default App() {
    const popupState = usePopupState()

    return (
        <PopupContext.Provider value={popupState}>
            <...other contexts>
                <Content />
            <...other ccontexts>
        </PopupContext.Provider>
    )
}
```

### Create a Toast component

[Example](https://github.com/bothrs/bofrost-app/blob/main/src/components/Toast.tsx)

### Add popup component in `app.tsx`

```
import { PopupContext, usePopupState } from '@bothrs/popup'
import Toast from "./components/Toast"

export default App() {
    const popupState = usePopupState()

    return (
        <PopupContext.Provider value={popupState}>
            <...other contexts>
                <Content />
                <Toast />
            <...other ccontexts>
        </PopupContext.Provider>
    )
}
```

### Show popup from anywhere in the app

import:

```
import { usePopup, PopupType } from '@bothrs/popup'
```

show the popup:

```
const { showPopup } = usePopup()

showPopup({
    text: modalText,
    type: 'success',
    bottomNavPresent: true,
    popupDuration: 4000,
    cta: {
    text: i.t('Show cart'),
    onPress: () => {
        navigation.navigate('Cart')
        resetPopup()
        },
    },
    icon: <CartIcon color="white" width={20} height={16} />,
})
```

hide the popup:

```
const { resetPopup } = usePopup()

resetPopup()
```
