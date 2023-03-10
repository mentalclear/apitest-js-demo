const usersXMLSchema = `<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified"
    xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xs:element name="objects">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="object">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="id">
                                <xs:complexType>
                                    <xs:simpleContent>
                                        <xs:extension base="xs:int">
                                            <xs:attribute type="xs:string" name="type" />
                                        </xs:extension>
                                    </xs:simpleContent>
                                </xs:complexType>
                            </xs:element>
                            <xs:element type="xs:string" name="name" />
                            <xs:element type="xs:string" name="email" />
                            <xs:element type="xs:string" name="gender" />
                            <xs:element type="xs:string" name="status" />
                        </xs:sequence>
                    </xs:complexType>
                </xs:element>
            </xs:sequence>
            <xs:attribute type="xs:string" name="type" />
        </xs:complexType>
    </xs:element>
</xs:schema>`;

export default usersXMLSchema;
