import React from "react";


import AppNavigator from "./navigation";
export default function App() {
  return <AppNavigator />;

}

export default function App(){

	useEffect(() => {
		(async function(){
			const {status} = await requestForegroundPermissionsAsync();

    })();

},[]);

return(
	  <View style = {styles.container}>
		  <MapView
		  	style={{flex:1}}
		  	region={{}}
		  />
	  </View>
  );
}

document.body.style.backgroundColor = '#FFC9D8'