import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  ToastAndroid,
} from 'react-native';
import _ from 'lodash';
import {useRecoilCallback, useRecoilState} from 'recoil';
import {listQuery, searchList} from '../../recoil/searchStore';
import {useDispatch, useSelector} from 'react-redux';
import {searchExample} from '../../redux/actions/searchAction';
import {persistStore} from 'redux-persist';
import {store} from '../../redux/store';

const color = '#ef4a6b'; // randomcolor();

export default function Search() {
  const [isLoadingRecoil, setIsLoadingRecoil] = useState(false);
  const [isLoadingRedux, setIsLoadingRedux] = useState(false);
  const [searchListRecoil, setSearchList] = useRecoilState(searchList);
  const searchListRedux = useSelector(
    (state: any) => state?.searchReducer?.searchList,
  );
  const dispatch = useDispatch();
  const onSubmit = (name: String) => {
    if (name?.length) {
      setIsLoadingRecoil(true);
      setIsLoadingRedux(true);
      dispatch(
        searchExample(name, () => {
          setIsLoadingRedux(false);
        }),
      );
      getData(name, (isSuccess: Boolean) => {
        setIsLoadingRecoil(false);
      });
    } else {
      ToastAndroid.show('Please fill input', 3000);
    }
  };

  const getData = useRecoilCallback(
    ({snapshot}: any) => async (name: String, onCompleted: Function) => {
      try {
        const dataSearchFetch = await snapshot?.getPromise(listQuery(name));
        setSearchList(dataSearchFetch);
        onCompleted(true);
      } catch (err) {
        onCompleted(false);
      }
    },
  );

  const loadTodoRedux = () => {
    persistStore(store, null, async () => {
      // console.log('~~~~~~~~~~!', store.getState().todoReducer.searchList);
    });
  };

  useEffect(() => {
    loadTodoRedux();
  }, []);

  const renderItem = (props: any) => {
    return (
      <View
        style={{
          height: 50,
          paddingHorizontal: 20,
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
        }}>
        <Image
          source={{uri: props?.item?.avatar}}
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: 'pink',
          }}
        />
        <Text style={{color: '#000', fontSize: 20, marginLeft: 10}}>
          {props?.item?.name}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      {InputTodo(
        'Search idol',
        (text: String) => {
          onSubmit(text);
        },
        color,
      )}
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text style={{marginTop: 10, marginLeft: 10, fontSize: 20}}>
            Recoil:
          </Text>
          {isLoadingRecoil || !searchListRecoil?.length ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>{isLoadingRecoil ? `Loading...` : `No data`}</Text>
            </View>
          ) : (
            <FlatList data={searchListRecoil || []} renderItem={renderItem} />
          )}
        </View>
        <View style={{flex: 1}}>
          <Text style={{marginTop: 10, marginLeft: 10, fontSize: 20}}>
            Redux:
          </Text>
          {isLoadingRedux || !searchListRedux?.length ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>{isLoadingRecoil ? `Loading...` : `No data`}</Text>
            </View>
          ) : (
            <FlatList data={searchListRedux || []} renderItem={renderItem} />
          )}
        </View>
      </View>
    </View>
  );
}
function InputTodo(titleInput: String, onSubmit: Function, color: String) {
  //   const [title, setTitle] = useState('');

  const onChangeText = _.debounce((text: String) => {
    console.log('goi api ne');
    onSubmit(text);
  }, 1000);

  return (
    <View style={{marginTop: 20}}>
      <Text style={{fontSize: 18, marginLeft: 10, color: '#606060'}}>
        {titleInput}:
      </Text>
      <View style={{flexDirection: 'row', marginLeft: 10}}>
        <TextInput
          onChangeText={onChangeText}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: color,
            flex: 1,
          }}
          // onSubmitEditing={() => {
          //   onSubmit(title);
          // }}
        />
        {/* <TouchableOpacity
            onPress={() => {
              onSubmit(title);
            }}
            style={{
              alignSelf: 'flex-end',
              backgroundColor: color,
              alignItems: 'center',
              marginHorizontal: 10,
              paddingHorizontal: 10,
            }}>
            <Text style={{fontSize: 18, color: '#fff'}}>Search</Text>
          </TouchableOpacity> */}
      </View>
    </View>
  );
}
