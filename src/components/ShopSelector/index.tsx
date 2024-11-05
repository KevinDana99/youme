import {
  Abbr,
  Container,
  Icon,
  Label,
  Option,
  Options,
  Selector,
} from "./styled";
import { IoStorefrontSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import useShopSelector from "./hooks/useShopSelector";

declare var shopSelectorData: {
  API_KEY_GOOGLE_MAPS: string;
  stores: string;
};

const selectorData = shopSelectorData;
const { API_KEY_GOOGLE_MAPS } = shopSelectorData;
const ShopSelector = () => {
  console.log(API_KEY_GOOGLE_MAPS, shopSelectorData.stores);
  const {
    handleOpenSelector,
    handleSelectedStore,
    selectedStore,
    visible,
    stores,
  } = useShopSelector({
    API_KEY_GOOGLE_MAPS: selectorData.API_KEY_GOOGLE_MAPS,
    stores: JSON.parse(selectorData.stores),
  });
  return (
    <Container>
      <Label>
        Seleccionar Tienda
        <Abbr className="required" title="obligatorio">
          *
        </Abbr>
      </Label>
      <Selector onClick={handleOpenSelector}>
        <IoStorefrontSharp size={20} /> {selectedStore.name}
        <IoIosArrowDown size={20} color="red" onClick={handleOpenSelector} />
      </Selector>
      <Options visible={visible}>
        {stores.map((option, index) => {
          return (
            <Option onClick={() => handleSelectedStore(index)}>
              <Icon>
                <IoStorefrontSharp size={20} color="red" />
              </Icon>
              {option.name}
            </Option>
          );
        })}
      </Options>
    </Container>
  );
};

export default ShopSelector;
