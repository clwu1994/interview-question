function RenderFunctionComponent() {
  const [firstName, setFirstName] = useState("Rudi");
  const [lastName, setLastName] = useState("Yardley");

  return <Button onClick={() => setFirstName("Fred")}>Fred</Button>;
}
