import { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useDisclosure
} from "@chakra-ui/react";
// import { Menu, Dropdown, Button } from "antd";
import { ArrowDownIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Logos";
import { useChain, useMoralis } from "react-moralis";
import Image from "next/image";

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    padding: "0 10px"
  },
  button: {
    border: "2px solid rgb(231, 234, 243)",
    borderRadius: "12px"
  }
};

const menuItems = [
  {
    key: "0x1",
    value: "Ethereum",
    icon: <ETHLogo />
  },
  {
    key: "0x539",
    value: "Local Chain",
    icon: <ETHLogo />
  },
  {
    key: "0x3",
    value: "Ropsten Testnet",
    icon: <ETHLogo />
  },
  {
    key: "0x4",
    value: "Rinkeby Testnet",
    icon: <ETHLogo />
  },
  {
    key: "0x2a",
    value: "Kovan Testnet",
    icon: <ETHLogo />
  },
  {
    key: "0x5",
    value: "Goerli Testnet",
    icon: <ETHLogo />
  },
  {
    key: "0x38",
    value: "Binance",
    icon: <BSCLogo />
  },
  {
    key: "0x61",
    value: "Smart Chain Testnet",
    icon: <BSCLogo />
  },
  {
    key: "0x89",
    value: "Polygon",
    icon: <PolygonLogo />
  },
  {
    key: "0x13881",
    value: "Mumbai",
    icon: <PolygonLogo />
  },
  {
    key: "0xa86a",
    value: "Avalanche",
    icon: <AvaxLogo />
  },
  {
    key: "0xa869",
    value: "Avalanche Testnet",
    icon: <AvaxLogo />
  }
];

function Chains() {
  const { switchNetwork, chainId, chain } = useChain();
  const { isAuthenticated } = useMoralis();
  const [selected, setSelected] = useState({});

  console.log("chain", chain);

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
    console.log("current chainId: ", chainId);
  }, [chainId]);

  const handleMenuClick = (e) => {
    console.log("switch to: ", e.key);
    switchNetwork(e.key);
  };

  const menu = (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Your Cats
      </MenuButton>
      <MenuList>
        <MenuItem minH="48px">
          <Image
            boxSize="2rem"
            borderRadius="full"
            src="https://placekitten.com/100/100"
            alt="Fluffybuns the destroyer"
            mr="12px"
          />
          <span>Fluffybuns the Destroyer</span>
        </MenuItem>
        <MenuItem minH="40px">
          <Image
            boxSize="2rem"
            borderRadius="full"
            src="https://placekitten.com/120/120"
            alt="Simon the pensive"
            mr="12px"
          />
          <span>Simon the pensive</span>
        </MenuItem>
      </MenuList>
    </Menu>

    // <Menu onClick={handleMenuClick}>
    //   {menuItems.map((item) => (
    //     <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
    //       <span style={{ marginLeft: "5px" }}>{item.value}</span>
    //     </Menu.Item>
    //   ))}
    // </Menu>
  );

  if (!chainId || !isAuthenticated) return null;

  return (
    // <div>
    //   <Dropdown overlay={menu} trigger={["click"]}>
    //     <Button
    //       key={selected?.key}
    //       icon={selected?.icon}
    //       style={{ ...styles.button, ...styles.item }}
    //     >
    //       <span style={{ marginLeft: "5px" }}>{selected?.value}</span>
    //       <ArrowDownIcon />
    //     </Button>
    //   </Dropdown>
    <div>
      <Menu>
        <MenuButton
          px={4}
          py={2}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: "gray.400" }}
          _expanded={{ bg: "blue.400" }}
          _focus={{ boxShadow: "outline" }}
        >
          File <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem>New File</MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuDivider />
          <MenuItem>Open...</MenuItem>
          <MenuItem>Save File</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default Chains;
