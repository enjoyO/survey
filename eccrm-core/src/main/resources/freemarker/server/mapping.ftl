<?xml version="1.0"?>
<!DOCTYPE hibernate-mapping PUBLIC
        "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
<hibernate-mapping package="${packagePath}.domain">
    <class name="${entity}" table="${tableName}">
        <id name="id" column="ID" length="40">
            <generator class="uuid"/>
        </id>


        <!-- 公共属性 -->
        <property name="description" column="DESCRIPTION" type="string" length="1000"/>
        <property name="creatorId" column="CREATOR_ID" type="string" length="40" update="false"/>
        <property name="creatorName" column="CREATOR_NAME" type="string" length="40"/>
        <property name="createdDatetime" column="CREATED_DATETIME" type="timestamp" update="false"/>
        <property name="modifierId" column="MODIFIER_ID" type="string" length="40"/>
        <property name="modifierName" column="MODIFIER_NAME" type="string" length="40"/>
        <property name="modifiedDatetime" column="MODIFIED_DATETIME" type="timestamp"/>
        <property name="tenementId" column="TENEMENT_ID" type="string" length="40" update="false"/>

    </class>
</hibernate-mapping>
