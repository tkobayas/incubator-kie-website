---
id: verify
title: Verify
sidebar_position: 0
---

To verify a release candidate, the following checklist could be used:

- [ ] Download links are valid.
- [ ] Checksums and signatures.
- [ ] LICENSE/NOTICE files exist.
- [ ] No unexpected binary files.
- [ ] All source files have ASF headers.
- [ ] Can compile from source.

:::note

It is NOT necessary to run all checks to cast a vote for a release candidate.

However, you should clearly state which checks you did. The release manager needs to ensure that each check was done.

:::

## Download links are valid

To verify the release candidate, you need to download the release candidate from the [dist](https://dist.apache.org/repos/dist/dev/kie/) directory.

Use the following command to download all artifacts, replace `"${release_version}-${rc_version}"` with the version ID of the version to be released:

```shell
svn co https://dist.apache.org/repos/dist/dev/kie/${release_version}-${rc_version}/
```

## Checksums and signatures

The release candidate should have a checksum and signature file.

For example, if the release candidate is `10.0.0-rc1`, the checksum and signature file should be:

```
https://dist.apache.org/repos/dist/dev/kie/10.0.0-rc1/apache-kie-10.0.0-rc1-src.tar.gz.sha512
https://dist.apache.org/repos/dist/dev/kie/10.0.0-rc1/apache-kie-10.0.0-rc1-src.tar.gz.asc
```

### Verify checksums and signatures

GnuPG is recommended here. It can be installed with the following command:

```shell
apt-get install gnupg
# or
yum install gnupg
# or
brew install gnupg
```

Firstly, import the KIE release manager's public key:

```shell
curl https://downloads.apache.org/kie/KEYS > KEYS # Download KEYS
gpg --import KEYS # Import KEYS to local
```

Then, trust the public key:

```shell
gpg --edit-key <KEY-used-in-this-version> # Edit the key
```

It will enter the interactive mode, use the following command to trust the key:

```shell
gpg> trust
```

And then, select the level of trust, for example:

```
Please decide how far you trust this user to correctly verify other users' keys
(by looking at passports, checking fingerprints from different sources, etc.)

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu
```

Select `5` to trust the key ultimately.

Next verify signature:
```bash
for i in *.tar.gz; do echo $i; gpg --verify $i.asc $i; done
```

If something like the following appears, it means the signature is correct:
```bash
apache-kie-incubating-10.0.0-src.tar.gz
gpg: Signature made Wed 17 Apr 2024 11:49:45 PM CST using RSA key ID 5E580BA4
gpg: checking the trustdb
gpg: 3 marginal(s) needed, 1 complete(s) needed, PGP trust model
gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
gpg: Good signature from "here"
```

Then verify checksum:
```bash
for i in *.tar.gz; do echo $i; sha512sum --check  $i.sha512; done
```

It should output something like:
```bash
apache-kie-incubating-10.0.0-src.tar.gz
apache-kie-incubating-10.0.0-src.tar.gz: OK
```

## Check the file content of the source package

Unzip `apache-kie-${release_version}-${rc_version}-src.tar.gz` and check the follows:

- LICENSE and NOTICE files are correct for the repository.
- All files have ASF license headers if necessary.
- Building is OK.

## Check the Maven artifacts of kie-java

Download the artifacts from `https://repository.apache.org/content/repositories/orgapachekie-${maven_artifact_number}/`.

You can check the follows:

- Checksum of JARs match the bundled checksum file.
- Signature of JARs match the bundled signature file.
- JARs is reproducible locally. This means you can build the JARs on your machine and verify the checksum is the same with the bundled one.

The reproducibility requires the same JDK distribution and the same Maven distribution. You should use [Eclipse Temurin JDK 17](https://adoptium.net/temurin/releases/?version=17) and Maven 3.9.6.
