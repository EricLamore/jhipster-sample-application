package com.universign.universigncs.nosiaxng.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;

/**
 * A Link.
 */
@Document(collection = "link")
public class Link implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @Field("group")
    @JsonIgnoreProperties("administrators")
    private Group group;

    @DBRef
    @Field("group")
    @JsonIgnoreProperties("operators")
    private Group group;

    @DBRef
    @Field("group")
    @JsonIgnoreProperties("affiliatedGroups")
    private Group group;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Group getGroup() {
        return group;
    }

    public Link group(Group group) {
        this.group = group;
        return this;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Group getGroup() {
        return group;
    }

    public Link group(Group group) {
        this.group = group;
        return this;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Group getGroup() {
        return group;
    }

    public Link group(Group group) {
        this.group = group;
        return this;
    }

    public void setGroup(Group group) {
        this.group = group;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Link)) {
            return false;
        }
        return id != null && id.equals(((Link) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Link{" +
            "id=" + getId() +
            "}";
    }
}
