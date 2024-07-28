import { Card, CardBody, Flex, Heading, Image, Text } from "@chakra-ui/react";

interface HCardProps {
  imagePath: string;
  title: string;
  description: string;
}

const HCard: React.FC<HCardProps> = ({ imagePath, title, description }) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <CardBody flexDirection={"row"} display={"flex"} px={3} columnGap={1}>
        <Flex justifyContent={"center"} align={"center"}>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "100px" }}
            src={imagePath}
            alt={title}
          />
        </Flex>
        <Flex direction={"column"}>
          <Heading size="sm">{title}</Heading>

          <Text fontSize={"small"} color={"black.500"}>
            {description}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default HCard;
